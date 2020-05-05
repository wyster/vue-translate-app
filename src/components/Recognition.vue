<template>
  <div :class="$style.module">
    <span v-if="error" :class="$style.error"> Error: {{ error }} </span>
    <button @click="start" v-if="status === statuses.START" :class="$style.btn">
      <i :class="[$style.icon, $style.icon__start]"></i>
    </button>
    <button
      v-if="status === statuses.PROCESS"
      :class="$style.btn"
      @click="stop"
    >
      <i :class="[$style.icon, $style.icon__loading]"></i>
    </button>
    <button
      @click="stop"
      v-if="status === statuses.STARTED"
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

declare global {
  interface Window {
    'dictate-service': any;
  }
}

@Component({})
export default class Index extends Vue {
  result: string = '';
  recognition: any | null = null;
  status: number = 1;
  error: string = '';
  statuses = {
    START: 1,
    STARTED: 2,
    PROCESS: 3,
    ERROR: 4,
    ENDED: 5
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

    navigator.getUserMedia({ audio: true }, this.speechStart, error => {
      this.error = error.message || 'getUserMedia error';
    });
  }
  async stop() {
    if (this.recognition) {
      await this.recognition.destroy();
      this.status = this.statuses.ENDED;
      this.recognition = null;
    }
  }
  async speechStart() {
    if (typeof window['dictate-service'] === 'undefined') {
      await import('@libs/dictate-service');
    }
    const service = window['dictate-service'];
    let base = '';
    this.recognition = await service.run({
      webSocketServerUrl: process.env.WEBSOCKET_SERVER,
      onPartialResults: (data: object) => {
        this.status = this.statuses.PROCESS;
        this.loading = true;
        this.$emit('result', base + ' ' + data);
      },
      onResults: (data: object) => {
        base += ' ' + data;
        this.status = this.statuses.PROCESS;
        this.loading = true;
        this.$emit('result', base);
      }
    });

    this.status = this.statuses.STARTED;
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
