export default class YouTube {
  constructor(element) {
    this.element = element;

    this.videoContainer = this.element.querySelector('.js-video');
    this.poster = this.element.querySelector('.js-poster');
    this.videoId = this.element.dataset.videoId;
    this.autoplay = this.poster ? 1 : 0;
    this.playerReady = false;

    this.options = {
      controls: 1,
      modale: false,
    };

    YouTube.instances.push(this);

    if (this.videoId) {
      YouTube.loadScript();
    } else {
      console.error('No');
    }
  }

  static loadScript() {
    if (!YouTube.scriptIsLoading) {
      YouTube.scriptIsLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }

  init() {
    this.setOptions();

    this.initPlayer = this.initPlayer.bind(this);
    if (this.poster && this.options.modale == false) {
      this.element.addEventListener('click', this.initPlayer.bind(this));
    } else if (this.poster && this.options.modale == true) {
      this.button.addEventListener('click', this.initPlayer.bind(this));
    } else {
      this.initPlayer();
    }
  }

  initPlayer(event) {
    if (event) {
      if (this.options.modale == false) {
        this.element.removeEventListener('click', this.initPlayer);
      } else {
        this.button.removeEventListener('click', this.initPlayer);
      }
    }

    if (this.options.modale == true) {
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
    }

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

          if (this.options.modale == false) {
            const observer = new IntersectionObserver(this.watch.bind(this), {
              rootMargin: '0px 0px 0px 0px',
            });
            observer.observe(this.element);
          }
        },
        onStateChange: (event) => {
          if (this.options.modale == false) {
            if (event.data == YT.PlayerState.PLAYING) {
              YouTube.pauseAll(this);
            } else if (event.data == YT.PlayerState.ENDED) {
              this.player.seekTo(0);
              this.player.pauseVideo();
            }
          }
        },
      },
    });
  }

  watch(entries) {
    if (this.playerReady && !entries[0].isIntersecting) {
      this.player.pauseVideo();
    }
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

    for (let i = 0; i < YouTube.instances.length; i++) {
      const instance = YouTube.instances[i];
      instance.init();
    }
  }

  static pauseAll(currentInstance) {
    for (let i = 0; i < YouTube.instances.length; i++) {
      const instance = YouTube.instances[i];
      if (instance.playerReady && instance !== currentInstance) {
        instance.player.pauseVideo();
      }
    }
  }

  setOptions() {
    if ('noControls' in this.element.dataset) {
      this.options.controls = 0;
    }
    console.log(this.options.controls);

    if ('modale' in this.element.dataset) {
      console.log('modale');
      this.options.modale = true;
      this.button = this.element.querySelector('.js-button');
      this.videoContainer = document
        .querySelector('.js-modale')
        .querySelector('.js-video');
    }
  }
}
YouTube.instances = [];
window.onYouTubeIframeAPIReady = YouTube.initAll;
