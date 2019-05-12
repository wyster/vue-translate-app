<template>
  <div :class="$style.module">
    <span v-if="error" :class="$style.error"> Error: {{ error }} </span>
    <button @click="start" v-if="status === statuses.START" :class="$style.btn">
      <i :class="[$style.icon, $style.icon__start]"></i>
    </button>
    <button v-if="status === statuses.PROCESS && loading" :class="$style.btn">
      <i :class="[$style.icon, $style.icon__loading]"></i>
    </button>
    <button
      @click="stop"
      v-if="status === statuses.PROCESS && !loading"
      :class="$style.btn"
    >
      <i :class="[$style.icon, $style.icon__stop]"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

declare var webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

@Component({})
export default class Index extends Vue {
  result: string = '';
  recognition: SpeechRecognition | null = null;
  status: number = 1;
  error: string = '';
  statuses = {
    START: 1,
    PROCESS: 2,
    ERROR: 3,
    ENDED: 4
  };
  loading: boolean = false;
  created() {
    this.$watch('status', v => {
      if (v === this.statuses.ENDED) {
        setTimeout(() => {
          this.status = this.statuses.START;
        }, 2000);
      }
      if (v === this.statuses.START) {
        this.error = '';
      }
    });
  }
  start(): void {
    if (this.recognition !== null) {
      return;
    }
    this.result = '';

    const speech = webkitSpeechRecognition || SpeechRecognition;
    this.recognition = new speech();
    if (!this.recognition) {
      return;
    }
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.onstart = () => {
      console.log('onstart');
      this.status = this.statuses.PROCESS;
    };
    this.recognition.onerror = event => {
      console.log(event);
      this.error = event.error;
    };
    this.recognition.onend = e => {
      console.log('onend', e);
      this.recognition = null;
      this.status = this.statuses.ENDED;
    };
    this.recognition.onresult = event => {
      this.loading = true;
      console.log(event);
      let final = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        }
      }

      if (final) {
        this.loading = false;
        this.result += final;
        this.$emit('result', this.result);
      }
    };
    this.recognition.onaudioend = e => {
      console.log('onaudioend', e);
    };

    //this.recognition.lang = 'ru-RU';
    this.recognition.lang = 'it-IT';
    this.recognition.start();
  }
  stop() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}
</script>

<style lang="less" module>
.module {
  margin: 5vh auto;
}

.btn {
  width: 60px;
  height: 60px;
  padding: 12px;
  text-align: center;
  position: relative;
  border: 2px solid hsl(0, 0%, 19%);
  border-radius: 50%;
  background: hsl(0, 0%, 7%);
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 30px;

  &:hover {
    background: hsl(0, 0%, 7%);
    opacity: 0.8;
  }
}

.icon {
  mask-size: contain;
  display: block;
  width: 30px;
  height: 30px;
  background: white;
  mask-repeat: no-repeat;

  &__start {
    mask-image: url('@/assets/microphone.svg');
  }

  &__stop {
    mask-image: url('@/assets/stop.svg');
  }

  &__loading {
    mask-image: url('@/assets/speech.svg');
  }
}
</style>
