export default class YoutubeModale {
  constructor(element) {
    this.element = element;

    this.button = this.element.querySelector('.js-button');
    this.videoContainer = document
      .querySelector('.js-modale')
      .querySelector('.js-video');
    this.poster = this.element.querySelector('.js-poster');
    this.videoId = this.element.dataset.videoId;
    this.autoplay = this.poster ? 1 : 0;
    this.playerReady = false;

    this.options = {
      controls: 1,
    };

    YoutubeModale.instances.push(this);

    if (this.videoId) {
      YoutubeModale.loadScript();
    } else {
      console.error('No');
    }
  }

  static loadScript() {
    if (!YoutubeModale.scriptIsLoading) {
      YoutubeModale.scriptIsLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }

  init() {
    this.setOptions();
    this.initPlayer = this.initPlayer.bind(this);
    if (this.poster) {
      this.button.addEventListener('click', this.initPlayer.bind(this));
    } else {
      this.initPlayer();
    }
  }

  initPlayer(event) {
    if (event) {
      this.button.removeEventListener('click', this.initPlayer);
    }

    document
      .querySelector('.js-modale')
      .querySelector('.js-video')
      .classList.remove('video-hidden');

    document.documentElement.addEventListener('click', (event) => {
      if (
        event.target == document.querySelector('.js-modale') ||
        event.target ==
          document.querySelector('.js-modale').querySelector('.js-x') ||
        event.target ==
          document.querySelector('.js-modale').querySelector('.js-icon')
      ) {
        this.onCloseModale();
      }
    });

    document.documentElement.classList.add('modale-is-active');

    this.player = new YT.Player(this.videoContainer, {
      height: '100%',
      width: '100%',
      videoId: this.videoId,
      playerVars: {
        rel: 0,
        autoplay: this.autoplay,
        controls: this.options.controls,
      },
      events: {
        onReady: () => {
          this.playerReady = true;
        },
      },
    });
  }

  onCloseModale() {
    document.documentElement.classList.remove('modale-is-active');
    this.player.pauseVideo();
    document
      .querySelector('.js-modale')
      .querySelector('.js-video')
      .classList.add('video-hidden');
  }

  static initAll() {
    document.documentElement.classList.add('is-video-ready');

    for (let i = 0; i < YoutubeModale.instances.length; i++) {
      const instance = YoutubeModale.instances[i];
      instance.init();
    }
  }

  setOptions() {
    if ('noControls' in this.element.dataset) {
      this.options.controls = 0;
    }
  }
}
YoutubeModale.instances = [];
window.onYouTubeIframeAPIReady = YoutubeModale.initAll;
