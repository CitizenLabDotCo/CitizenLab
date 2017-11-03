import * as React from 'react';

const getIcon = (name: string, className: string | undefined) => {
  switch (name) {
    case 'logo': {
      return (
        <svg className={className} height="100%" viewBox="0 1 140.753 27.002">
          <path d="M21.35 1.004h-5.482c-.388 0-.815 0-1.272-.002-1.226-.002-2.618-.005-4.114.006-1.28.01-2.575.005-3.718 0-.584 0-1.134-.003-1.628-.003H0v8.233c0 3.633.488 6.853 1.452 9.573.805 2.27 1.942 4.206 3.38 5.75l.183.192.024.025c.592.61 1.24 1.156 1.92 1.625l.02.014c.063.043.124.084.19.126.026.02.054.035.08.054l.067.04.018.013c1.546.975 2.775 1.24 2.91 1.267l.43.086.432-.086c.135-.027.858-.19 1.86-.682 1.276-.63 2.504-1.557 3.55-2.683 1.438-1.545 2.575-3.48 3.38-5.75.963-2.718 1.452-5.936 1.452-9.566v-.153c.005-1.52.003-2.737 0-3.715V4.33c0-.978 0-1.518.004-2.08l-.004-1.246zM2.513 3.534H9.43v2.74l-2.534 2.55H2.513v-5.29zm6.916 21.4c-.256-.127-.51-.27-.758-.428l-.016-.01-.05-.03c-.022-.017-.045-.03-.065-.044-.05-.03-.097-.064-.145-.098l-.02-.014c-.545-.375-1.064-.814-1.543-1.306l-.018-.02c-.05-.05-.1-.104-.15-.155-1.2-1.29-2.157-2.93-2.845-4.87-.68-1.92-1.1-4.157-1.248-6.648h4.325l2.532 2.55v11.072zm1.235-13.347l-1.508-1.52 1.51-1.52 1.508 1.52-1.51 1.52zm6.866 6.366c-.687 1.94-1.645 3.58-2.845 4.87-.83.892-1.79 1.622-2.78 2.12v-11.08l2.532-2.55h4.34c-.147 2.488-.566 4.72-1.246 6.64zm1.303-9.214H14.43l-2.532-2.55V3.533h6.94v.125c0 .863.003 2.632-.005 5.08zM32.558 20.5c-1.864 0-3.453-1.38-3.453-3.838 0-2.457 1.562-3.81 3.425-3.81h.002c1.81 0 2.658 1.16 2.987 2.29l3.26-1.102c-.576-2.29-2.66-4.583-6.33-4.583-3.92 0-6.99 3.01-6.99 7.205 0 4.168 3.125 7.205 7.1 7.205 3.59 0 5.7-2.32 6.302-4.583l-3.207-1.076c-.3 1.05-1.233 2.292-3.097 2.292zM41 9.87h3.646v13.583H41zM42.808 3.137c-1.233-.002-2.246 1.02-2.246 2.29 0 1.215 1.014 2.236 2.246 2.236 1.26 0 2.248-1.02 2.248-2.236 0-1.27-.987-2.29-2.248-2.29zM52.484 5.814h-3.29v1.904c0 1.215-.658 2.153-2.08 2.153h-.688v3.26h2.44v6.32c0 2.624 1.644 4.196 4.275 4.196 1.07 0 1.728-.192 2.057-.33V20.28c-.192.054-.685.11-1.124.11-1.04 0-1.59-.39-1.59-1.576V13.13h2.714V9.87h-2.713V5.814zM57.743 23.453h3.646V9.87h-3.647M59.554 3.137c-1.233-.002-2.247 1.02-2.247 2.29 0 1.215 1.013 2.236 2.246 2.236 1.26 0 2.248-1.02 2.248-2.236 0-1.27-.985-2.29-2.246-2.29zM68.268 20.25l6.578-7.314V9.872h-10.88v3.174h6.22L63.8 20.223v3.23h11.154V20.25M82.9 9.457c-3.45 0-6.63 2.816-6.63 7.15 0 4.582 3.26 7.26 6.958 7.26 3.316 0 5.455-1.96 6.14-4.307l-3.04-.91c-.44 1.214-1.37 2.07-3.07 2.07-1.808 0-3.316-1.298-3.398-3.094h9.646c0-.054.055-.605.055-1.13 0-4.36-2.494-7.04-6.66-7.04zm-2.96 5.66c.085-1.243 1.126-2.678 3.016-2.68 2.083 0 2.96 1.327 3.017 2.68H79.94zM99.318 9.513c-1.452 0-3.07.635-3.89 2.042V9.87H91.89v13.583h3.646V15.64h-.002c0-1.572.93-2.814 2.52-2.814 1.755 0 2.495 1.187 2.495 2.705v7.924h3.647v-8.557c0-2.983-1.535-5.384-4.88-5.384zM107.594 3.467h2.576v19.986h-2.576zM124.338 14.62c0-2.594-1.533-4.86-5.48-4.86-2.85 0-5.125 1.767-5.4 4.307l2.468.58c.164-1.546 1.177-2.677 2.987-2.677 2 0 2.85 1.076 2.85 2.373 0 .47-.22.884-1.014.994l-3.565.524c-2.272.33-4 1.657-4 4.032 0 2.098 1.728 3.975 4.412 3.975 2.358 0 3.674-1.27 4.248-2.207 0 .966.082 1.463.14 1.793h2.52c-.056-.33-.165-1.02-.165-2.18V14.62zm-2.576 3.146c0 2.9-1.697 3.92-3.808 3.92-1.315 0-2.14-.938-2.14-1.933 0-1.188.824-1.82 1.918-1.987l4.03-.606v.606zM134.697 9.788c-2.193 0-3.727 1.077-4.357 2.264V3.467h-2.55v19.986h2.55V21.52c.823 1.436 2.33 2.292 4.273 2.292 3.92 0 6.14-3.12 6.14-7.067 0-3.865-2.056-6.957-6.056-6.957zm-.467 11.705c-2.274 0-3.918-1.878-3.918-4.748s1.644-4.665 3.918-4.665c2.385 0 3.892 1.795 3.892 4.665s-1.534 4.748-3.892 4.748z" />
        </svg>
      );
    }
    case 'close': {
      return (
        <svg className={className} height="100%" viewBox="2 2.002 19.998 19.997">
          <path d="M19.07 4.93c-3.902-3.904-10.238-3.904-14.142 0-3.903 3.902-3.903 10.238 0 14.142 3.903 3.902 10.24 3.902 14.142 0 3.905-3.904 3.905-10.24 0-14.143zm-2.828 9.898l-1.414 1.414L12 13.414l-2.83 2.828-1.413-1.414L10.587 12l-2.83-2.83L9.17 7.758l2.83 2.83 2.828-2.83 1.414 1.414L13.414 12l2.828 2.828z" />
        </svg>
      );
    }
    case 'close2': {
      return (
        <svg className={className} height="100%" viewBox="0 0 15.414 15.414">
          <path d="M15.414 2.117L13.297 0l-5.59 5.59L2.117 0 0 2.117l5.59 5.59L0 13.297l2.117 2.117 5.59-5.59 5.59 5.59 2.117-2.117-5.59-5.59" />
        </svg>
      );
    }
    case 'close3': {
      return (
        <svg className={className} height="100%" viewBox="0.424 0.424 13.152 13.152">
          <path d="M7.986 7l.212-.212 5.378-5.378-.986-.986-5.378 5.378L7 6.014l-.212-.212L1.41.424l-.986.986 5.378 5.378.212.212-.212.212L.424 12.59l.986.986 5.378-5.378L7 7.986l.212.212 5.378 5.378.986-.986-5.378-5.378"/>
        </svg>
      );
    }
    case 'close4': {
      return (
        <svg className={className} height="100%" viewBox="0 0 13 13">
          <path d="M7.84 6.5l4.89-4.84c.176-.174.274-.412.27-.66 0-.552-.447-1-1-1-.25.003-.488.107-.66.29L6.5 5.13 1.64.27C1.47.1 1.24.003 1 0 .448 0 0 .448 0 1c.01.23.105.45.27.61L5.16 6.5.27 11.34c-.177.173-.274.412-.27.66 0 .552.448 1 1 1 .246-.004.48-.105.65-.28L6.5 7.87l4.81 4.858c.183.184.433.28.69.27.553 0 1-.446 1-.998-.01-.23-.105-.45-.27-.61L7.84 6.5z"/>
        </svg>
      );
    }
    case 'upload': {
      return (
        <svg className={className} height="100%" viewBox="0 0.621 79 53.713">
          <path d="M72.227 39.8C71.234 34.785 66.81 31 61.5 31c-4.215 0-7.867 2.392-9.697 5.885-4.383.473-7.803 4.185-7.803 8.7 0 4.833 3.916 8.75 8.75 8.75h18.96c4.023 0 7.29-3.27 7.29-7.294 0-3.85-2.997-6.97-6.773-7.24zm-7.81 4.325v5.834h-5.833v-5.835H54.21l7.29-7.29 7.29 7.29h-4.374zM27.378 11.803c0 2.73 2.243 4.97 4.978 4.97s4.978-2.24 4.978-4.97-2.244-4.97-4.978-4.97-4.978 2.24-4.978 4.97zm7.466 0c0 1.387-1.1 2.485-2.49 2.485s-2.488-1.098-2.488-2.485c0-1.387 1.1-2.485 2.49-2.485s2.488 1.098 2.488 2.485z" />
          <path d="M42.597 37.895h-2.833l-6.222-6.95 8.128-8.62 8.77 9.575c.562-.622 1.187-1.17 1.836-1.685l-9.673-10.57c-.255-.27-.62-.413-.99-.387-.32.018-.62.156-.837.388L31.87 29.08 18.98 14.697c-.28-.32-.707-.474-1.127-.408-.276.044-.53.182-.72.388L2.49 30.38V4.35c0-.71.533-1.244 1.244-1.244h48.533c.71 0 1.245.533 1.245 1.243V29.33c.79-.5 1.618-.932 2.488-1.276V4.35C56 2.305 54.313.62 52.267.62H3.733C1.687.62 0 2.306 0 4.35V36.65c0 2.044 1.687 3.728 3.733 3.728h37.392c.398-.884.89-1.718 1.472-2.485zm-38.864 0c-.71 0-1.245-.533-1.245-1.243v-2.62l15.536-16.657 18.395 20.52H3.732z" />
        </svg>
      );
    }
    case 'error': {
      return (
        <svg className={className} height="100%" viewBox="2 2 20 20">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M11 15h2v2h-2zM11 7h2v6h-2z" />
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        </svg>
      );
    }
    case 'checkmark': {
      return (
        <svg className={className} height="100%" viewBox="0 0 19 15">
          <path d="M6.05 11.467L1.533 6.95 0 8.482l6.05 6.05 13-13L17.517 0z" fillRule="evenodd" />
        </svg>
      );
    }
    case 'dropdown': {
      return (
        <svg className={className} height="100%" viewBox="0 0 9 6">
          <path fillRule="evenodd" d="M7.939 0L4.5 3.439 1.061 0 0 1.061l4.5 4.5 4.5-4.5z" />
        </svg>
      );
    }
    case 'arrow-back': {
      return (
        <svg className={className} height="100%" viewBox="0 0 24 24" >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      );
    }
    case 'plus': {
      return (
        <svg className={className} height="100%" viewBox="0 0 51 51">
          <path d="M0 19.89v11.118h19.631V51h11.634V31.008H51V19.89H31.265V0H19.63v19.89H0z" />
        </svg>
      );
    }
    case 'plus-circle': {
      return (
        <svg className={className} height="100%" viewBox="2 2 20 20">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
        </svg>
      );
    }
    case 'comment': {
      return (
        <svg className={className} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      );
    }
    case 'delete': {
      return (
        <svg className={className} height="100%" viewBox="0 0 12 14">
          <path d="M.92 13.126c0 .483.413.874.923.874h8.308c.513 0 .926-.39.926-.874V4.124H.92v9.002zM8.246 4.99h1.43v7.28c0 .376-.32.68-.713.68-.396 0-.717-.304-.717-.68V4.99zm-2.964 0h1.433v7.28c0 .376-.32.68-.716.68-.397 0-.717-.304-.717-.68V4.99zm-1.553 0v7.28c0 .376-.322.68-.716.68s-.715-.304-.715-.68V4.99h1.43zM11.076.936H7.452v-.5S7.435 0 6.974 0h-1.98c-.46 0-.444.437-.444.437v.5H.923c-.51 0-.923.39-.923.874v1.44h12V1.81c0-.482-.414-.874-.924-.874z" />
        </svg>
      );
    }
    case 'edit': {
      return (
        <svg className={className} viewBox="0 0 12 12" height="100%">
          <path id="a" fillRule="evenodd" d="M0 9.3v2.448h2.448L9.67 4.525 7.223 2.077 0 9.3zm11.557-6.66c.255-.256.255-.67 0-.925L10.033.19c-.255-.254-.67-.254-.924 0L7.914 1.386l2.447 2.448 1.195-1.194z" />
        </svg>
      );
    }
    case 'upvote': {
      return (
        <svg className={className} height="100%" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
        </svg>
      );
    }
    case 'upvote-2': {
      return (
        <svg className={className} height="100%" viewBox="0 0.8 22.281 19.397">
          <path d="M22.28 10.152c0-.97-.765-1.732-1.74-1.732h-5.223c-.278 0-1.254-.416-.487-1.593.487-.9.487-4.295.487-4.295 0-.97-.767-1.732-1.74-1.732s-1.742.762-1.742 1.732c0 5.057-4.875 6.58-4.875 6.58v9.006c2.23.763 2.786 2.08 5.57 2.08h5.225c.975 0 1.74-.764 1.74-1.733 0-.416-.14-.762-.348-1.04.976 0 1.74-.76 1.74-1.73 0-.416-.14-.832-.417-1.18.696-.275 1.114-.9 1.114-1.592 0-.415-.14-.83-.418-1.178.628-.208 1.115-.83 1.115-1.593zM3.482 7.73H0v11.776h3.482c1.184 0 2.09-.97 2.09-2.078v-7.62c0-1.178-.905-2.078-2.09-2.078z" />
        </svg>
      );
    }
    case 'downvote': {
      return (
        <svg className={className} height="100%" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
        </svg>
      );
    }
    case 'downvote-2': {
      return (
        <svg className={className} height="100%" viewBox="0 0.604 22.291 19.396">
          <path d="M4.526.604c-.975 0-1.74.762-1.74 1.73 0 .417.138.764.347 1.04-.975 0-1.74.763-1.74 1.732 0 .416.14.83.417 1.177-.696.278-1.114.902-1.114 1.594 0 .416.14.832.418 1.18C.487 9.262 0 9.884 0 10.646c0 .97.766 1.73 1.74 1.73h5.224c.28 0 1.254.416.488 1.595-.488.9-.488 4.295-.488 4.295 0 .97.766 1.733 1.74 1.733s1.742-.762 1.742-1.73c0-5.06 4.875-6.58 4.875-6.58V2.68C13.093 1.92 12.537.604 9.75.604H4.526zM18.81 1.293c-1.185 0-2.09.97-2.09 2.078v7.622c0 1.178.905 2.078 2.09 2.078h3.481V1.293h-3.48z" />
        </svg>
      );
    }
    case 'upvote-outline': {
      return (
        <svg className={className} height="100%" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M14.174 2.41l.35.346c.085.085.137.2.145.32l-.02.206-.94 4.514L13.46 9H21c.534 0 .973.42 1 .95l-.002.01-.05.493.052.05V12c0 .125-.022.24-.06.337l-3.023 7.06c-.153.366-.513.603-.917.603H9c-.55 0-1-.448-1-1V9c0-.267.102-.513.297-.704l5.877-5.885M4 10v10H2V10h2m10.17-9L7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1zM5 9H1v12h4V9z" />
        </svg>
      );
    }
    case 'chevron-right': {
      return (
        <svg className={className} height="100%" viewBox="9.155 6.565 6.279 10.869">
          <path d="M15.435 12L10 6.565l-.845.846 4.298 4.307.282.283-.282.283-4.298 4.307.845.845" />
          <path fill="none" d="M0 0h24v24H0V0z" />
        </svg>
      );
    }
    case 'downvote-outline': {
      return (
        <svg className={className} height="100%" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M22 4v10h-2V4h2m-7 0c.552 0 1 .45 1 1v10c0 .268-.103.518-.287.703L9.827 21.59l-.35-.346c-.084-.086-.137-.2-.145-.32l.02-.205.938-4.517.25-1.203H3c-.535 0-.972-.422-1-.95l.002-.01.05-.493-.052-.05V12c0-.125.022-.24.06-.336l3.024-7.06C5.236 4.238 5.596 4 6 4h9m8-1h-4v12h4V3zm-8 0H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2z" />
        </svg>
      );
    }
    case 'idea': {
      return (
        <svg className={className} height="100%" viewBox="0 0 22.496 20.814">
          <path d="M11.248 3.75c.448 0 .813-.362.813-.812V.813C12.063.363 11.7 0 11.25 0c-.45 0-.813.363-.813.813V2.94c0 .448.363.81.813.81zM20.244 4.142c-.284-.348-.794-.402-1.144-.12L17.45 5.36c-.352.283-.405.793-.12 1.143.28.35.794.403 1.142.12l1.652-1.337c.35-.282.402-.794.12-1.144zM21.865 12.516l-2.07-.478c-.438-.1-.874.172-.976.61-.1.437.172.874.61.975l2.07.478c.437.103.873-.17.974-.607.1-.44-.17-.876-.61-.977zM2.7 12.038l-2.07.478c-.437.1-.71.538-.61.976.103.438.54.71.978.608l2.07-.477c.437-.1.71-.538.61-.975-.102-.438-.54-.71-.977-.61zM3.395 4.022c-.35-.282-.86-.228-1.144.12h.002c-.282.35-.23.86.12 1.144l1.65 1.338c.352.282.86.228 1.146-.12.282-.35.23-.862-.12-1.144L3.395 4.022zM8.81 20.078c0 .405.348.736.773.736h3.098c.427 0 .776-.33.776-.736v-.735H8.81v.735zM11.132 6.104c-2.99 0-5.42 2.31-5.42 5.15 0 1.75.92 3.286 2.323 4.22v1.663c0 .404.35.735.774.735h4.645c.426 0 .773-.33.773-.735v-1.663c1.4-.934 2.323-2.47 2.323-4.22 0-2.84-2.43-5.15-5.418-5.15zm2.208 8.164l-.66.442v1.69H9.584V14.71l-.658-.44c-1.045-.69-1.665-1.815-1.665-3.015 0-2.03 1.735-3.678 3.872-3.678s3.872 1.648 3.872 3.678c0 1.2-.62 2.325-1.664 3.015z" />
        </svg>
      );
    }
    case 'compass': {
      return (
        <svg className={className} height="100%" viewBox="0 0 18 18">
          <circle cx="9" cy="9" r=".99" />
          <path d="M9 0C4.028 0 0 4.027 0 9c0 4.968 4.027 9 9 9 4.972 0 9-4.032 9-9 0-4.973-4.027-9-9-9zm1.972 10.97l-7.37 3.43L7.03 7.028 14.4 3.6l-3.428 7.37z" />
        </svg>
      );
    }
    case 'user': {
      return (
        <svg className={className} height="100%" viewBox="2 2 20 20">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          <path fill="none" d="M0 0h24v24H0V0z"/>
        </svg>
      );
    }
    case 'notification': {
      return (
        <svg className={className} height="100%" viewBox="4 2.5 16 19.5">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zM18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
      );
    }
    case 'search': {
      return (
        <svg className={className} height="100%" viewBox="0 0 19 19">
          <path id="a" d="M13.58 11.95h-.864l-.3-.3c1.065-1.232 1.706-2.834 1.706-4.59 0-3.9-3.16-7.06-7.06-7.06C3.16 0 0 3.16 0 7.06c0 3.9 3.16 7.062 7.06 7.062 1.756 0 3.358-.64 4.59-1.7l.3.3v.857L17.38 19 19 17.38l-5.42-5.43zm-6.52 0c-2.698 0-4.887-2.19-4.887-4.89 0-2.698 2.19-4.887 4.888-4.887 2.7 0 4.89 2.19 4.89 4.888 0 2.7-2.19 4.89-4.89 4.89z"/>
        </svg>
      );
    }
    case 'lock-outlined': {
      return (
        <svg className={className} height="100%" viewBox="4 1 16 21">
          <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"/>
        </svg>
      );
    }
    case 'facebook': {
      return (
        <svg className={className} height="100%" viewBox="4.588 4.588 257.717 257.719">
          <path d="M248.082 4.588H18.812c-7.856 0-14.224 6.367-14.224 14.224v229.27c0 7.855 6.366 14.226 14.224 14.226h123.432v-99.803H108.66V123.61h33.584V94.924c0-33.287 20.33-51.413 50.024-51.413 14.225 0 26.45 1.06 30.012 1.533v34.788l-20.596.01c-16.147 0-19.274 7.673-19.274 18.934v24.832h38.515l-5.016 38.895h-33.5v99.803h65.673c7.854 0 14.223-6.37 14.223-14.225V18.813c0-7.858-6.37-14.225-14.224-14.225z"/>
        </svg>
      );
    }
    case 'twitter': {
      return (
        <svg className={className} height="100%" viewBox="1.001 0.991 298.004 242.19">
          <path d="M94.72 243.182c112.46 0 173.96-93.168 173.96-173.96 0-2.646-.054-5.28-.173-7.903 11.938-8.63 22.314-19.4 30.498-31.66-10.955 4.868-22.744 8.146-35.11 9.625 12.623-7.57 22.313-19.543 26.886-33.817-11.812 7.003-24.895 12.093-38.823 14.84C240.8 8.426 224.917.994 207.327.994c-33.763 0-61.143 27.38-61.143 61.132 0 4.798.536 9.465 1.585 13.94-50.816-2.557-95.875-26.886-126.03-63.88-5.252 9.035-8.28 19.53-8.28 30.73 0 21.212 10.795 39.938 27.21 50.893-10.032-.31-19.455-3.063-27.69-7.646-.01.257-.01.507-.01.78 0 29.61 21.075 54.332 49.052 59.935-5.138 1.4-10.543 2.15-16.122 2.15-3.934 0-7.767-.386-11.49-1.102 7.782 24.293 30.353 41.97 57.114 42.465-20.927 16.402-47.287 26.17-75.938 26.17-4.93 0-9.798-.28-14.584-.845 27.06 17.344 59.19 27.464 93.722 27.464"/>
        </svg>
      );
    }
    case 'comments': {
      return (
        <svg className={className} height="100%" viewBox="0 0 24 19">
          <g>
            <path d="M21.75 5.32h-10.5C9.976 5.32 9 6.308 9 7.6v6.08c0 1.217.975 2.28 2.25 2.28h7.5l3 3.04v-3.04c1.275 0 2.25-1.063 2.25-2.28V7.6c0-1.292-.975-2.28-2.25-2.28z"/>
            <path d="M15 3.8V2.28C15 .988 14.025 0 12.75 0H2.25C.976 0 0 .988 0 2.28v6.08c0 1.216.975 2.28 2.25 2.28v3.04l3-3.04H7.5V7.6c0-2.128 1.65-3.8 3.75-3.8H15z"/>
          </g>
        </svg>
      );
    }
    case 'warning': {
      return (
        <svg className={className} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <use xlinkHref="#a" fill="#01A1B1"/>
          <defs>
            <path id="a" d="M0 17.273h20L10 0 0 17.273zm10.91-2.727H9.09v-1.82h1.82v1.82zm0-3.637H9.09V7.272h1.82v3.636z"/>
          </defs>
        </svg>
      );
    }
    case 'power': {
      return (
        <svg className={className} height="100%" viewBox="0 0 36 36">
          <path d="M16 0h4v20h-4z"/>
          <path d="M29.67 4.33l-2.83 2.83C29.98 9.73 32 13.62 32 18c0 7.73-6.27 14-14 14S4 25.73 4 18c0-4.38 2.02-8.27 5.16-10.84L6.33 4.33C2.47 7.63 0 12.52 0 18c0 9.94 8.06 18 18 18s18-8.06 18-18c0-5.48-2.47-10.37-6.33-13.67z"/>
        </svg>
      );
    }
    case 'admin': {
      return (
        <svg className={className} height="100%" viewBox="6 2 36 44">
          <path d="M24 2L6 10v12c0 11.11 7.67 21.47 18 24 10.33-2.53 18-12.89 18-24V10L24 2zm0 39.85V24H10V12.6l14-6.22v17.6h14c-1.06 8.24-6.55 15.58-14 17.87z"/>
        </svg>
      );
    }
    case 'settings': {
      return (
        <svg className={className} height="100%" viewBox="56.375 172.912 482.654 496.067">
          <path d="M534.264 486.178l-52.335-41.05c.99-7.937 1.735-15.998 1.735-24.183 0-8.186-.744-16.247-1.736-24.184l52.458-41.048c4.713-3.72 6.077-10.417 2.977-15.875l-49.606-85.943c-3.102-5.333-9.55-7.565-15.132-5.333l-61.76 24.928c-12.774-9.797-26.788-18.106-41.918-24.432l-9.3-65.73c-1.117-5.828-6.202-10.416-12.403-10.416h-99.213c-6.2 0-11.285 4.588-12.277 10.417l-9.302 65.73c-15.13 6.324-29.144 14.51-41.917 24.43l-61.76-24.926c-5.582-2.107-12.03 0-15.13 5.334L58.04 339.838c-3.1 5.333-1.736 12.03 2.976 15.875l52.335 41.05c-.99 7.936-1.734 15.997-1.734 24.183 0 8.185.744 16.246 1.735 24.183l-52.334 41.05c-4.712 3.72-6.076 10.417-2.976 15.873l49.606 85.944c3.1 5.332 9.55 7.564 15.13 5.332l61.76-24.928c12.774 9.797 26.788 18.106 41.918 24.43l9.302 65.73c.992 5.828 6.076 10.417 12.277 10.417h99.213c6.2 0 11.286-4.59 12.278-10.418l9.3-65.73c15.13-6.323 29.145-14.51 41.92-24.43l61.76 24.927c5.58 2.107 12.03 0 15.13-5.333l49.606-85.944c3.1-5.333 1.737-12.03-2.976-15.875zm-236.624 21.58c-47.994 0-86.812-38.818-86.812-86.813 0-47.995 38.817-86.812 86.812-86.812s86.812 38.817 86.812 86.812c0 47.994-38.818 86.812-86.812 86.812z"/>
        </svg>
      );
    }
    case 'send': {
      return (
        <svg className={className} height="100%" viewBox="4 6 42 36">
          <path d="M4.02 6L4 20l30 4-30 4 .02 14L46 24"/>
        </svg>
      );
    }
    case 'analytics': {
      return (
        <svg className={className} height="100%" viewBox="-40.5 -16.375 30.181 30.613">
          <path d="M-25.54-12.775h-1.616c-7.367 0-13.344 6.05-13.344 13.507s5.977 13.507 13.344 13.507c7.367 0 13.343-6.05 13.343-13.508V-.904H-25.54v-11.87z"/>
          <path d="M-10.582-4.694c-.826-5.86-5.45-10.577-11.275-11.414l-1.842-.267V-2.83h13.382l-.264-1.864z"/>
        </svg>
      );
    }
    case 'people': {
      return (
        <svg className={className} height="100%" viewBox="-64 -903.46 25 25">
          <path d="M-44.784-891.708c-.097-.062-.21-.094-.325-.09-.085.004-.17.028-.247.07-.077.043-.144.102-.193.174-1.312 1.885-3.482 3.117-5.95 3.117s-4.636-1.232-5.946-3.117c-.084-.12-.21-.203-.354-.232s-.29 0-.414.078C-61.69-889.48-64-885.56-64-881.108c0 .74.062 1.464.186 2.17.023.134.092.255.193.343.103.087.23.135.364.135h23.51c.133 0 .262-.048.365-.135.1-.088.17-.21.192-.343.123-.704.188-1.428.188-2.17 0-4.452-2.308-8.372-5.784-10.6zM-51.5-891.936c3.153 0 5.728-2.583 5.728-5.763 0-3.178-2.574-5.76-5.728-5.76-3.152 0-5.727 2.582-5.727 5.76 0 3.18 2.575 5.764 5.727 5.764z"/>
        </svg>
      );
    }
    case 'groups': {
      return (
        <svg className={className} height="100%" viewBox="22 10.5 44 21">
          <path d="M28.64 19.212c.483.487 1.06.85 1.68 1.058.336.092.676.16 1.02.202.666.057 1.335-.07 1.95-.372 1.7-.79 3.392-3.152 2.585-6.04-.194-.733-.534-1.405-.995-1.965-.46-.56-1.028-.993-1.66-1.267-.29-.118-.59-.208-.895-.27l-.453-.058c-2.26-.04-3.682 1.296-4.347 3.04-.45 1.252-.454 2.65-.01 3.906.255.675.638 1.278 1.124 1.766zM54.712 20.1c.614.3 1.284.43 1.952.372.342-.043.682-.11 1.016-.202v-.002c.623-.21 1.197-.57 1.683-1.058.485-.488.87-1.09 1.124-1.766.443-1.255.44-2.654-.01-3.906-.664-1.742-2.088-3.078-4.347-3.037l-.454.057c-.304.062-.603.153-.894.27-.632.273-1.2.707-1.66 1.267-.462.56-.802 1.232-.996 1.965-.807 2.885.887 5.25 2.586 6.04zM42.2 21.678c.614.3 1.284.43 1.952.373.342-.042.682-.11 1.016-.2.623-.21 1.198-.572 1.684-1.06.484-.49.868-1.093 1.123-1.768.443-1.255.44-2.654-.01-3.906-.664-1.742-2.088-3.077-4.347-3.037l-.453.056c-.304.062-.603.152-.894.27-.632.274-1.2.708-1.66 1.268s-.802 1.23-.995 1.964c-.806 2.887.887 5.252 2.586 6.04z"/>
          <path d="M65.137 25.43c-.578-1.408-1.424-2.653-2.48-3.648-.48-.438-.987-.838-1.518-1.197l-.555-.327c-.272.284-.45.673-.744.937-.963.867-2.513 1.858-4.386 1.39-.417-.1-.824-.242-1.217-.43-.607-.298-1.152-.735-1.6-1.287l-.402-.542c-.188.06-.365.154-.522.283-.55.364-1.6 1.26-1.6 1.26s2.074 1.67 3.094 3.316c1.02 1.647 1.554 4.736 1.554 4.736H66c.01-1.552-.286-3.086-.863-4.493zM50.15 23.36c-.482-.44-.99-.84-1.52-1.198l-.555-.327c-.27.284-.45.673-.744.937-.962.867-2.513 1.86-4.386 1.39-.416-.1-.824-.242-1.216-.43-.607-.298-1.153-.735-1.6-1.287l-.403-.542c-.188.06-.365.154-.523.283-.523.354-1.023.75-1.498 1.186-1.05.994-1.895 2.24-2.47 3.645-.577 1.404-.87 2.936-.862 4.484h19.116c.01-1.55-.286-3.084-.862-4.49-.577-1.41-1.423-2.656-2.477-3.65zM37.885 21.87s-1.048-.9-1.598-1.264c-.158-.13-.336-.225-.523-.282l-.402.542c-.447.55-.992.99-1.6 1.286-.393.188-.8.332-1.217.43-1.873.47-3.424-.52-4.387-1.39-.293-.263-.472-.653-.744-.937l-.554.328c-.53.358-1.038.758-1.52 1.197-1.054.994-1.9 2.24-2.477 3.647-.578 1.407-.873 2.94-.864 4.492h11.238s.532-3.09 1.553-4.737 3.095-3.314 3.095-3.314z"/>
        </svg>
      );
    }
    case 'project': {
      return (
        <svg className={className} height="100%" viewBox="-146.666 -21.639 26.443 26.725">
          <path d="M-121.124-13.61l-12.47-8.03-12.472 8.03v2.142h24.942M-120.264 3.8l-1.38-5.406v-8.833h-23.88v8.834L-146.64 3.8c-.158.643.425 1.285.903 1.285h24.836c.477 0 .795-.642.636-1.285zM-139.688.802h-2.653v-6.69c0-.75.583-1.34 1.326-1.34.743 0 1.327.59 1.327 1.34V.8zm4.777 0h-2.654v-6.69c0-.75.583-1.34 1.327-1.34.743 0 1.327.59 1.327 1.34V.8zm4.775 0h-2.653v-6.69c0-.75.584-1.34 1.327-1.34.74 0 1.325.59 1.325 1.34V.8zm4.776 0h-2.652v-6.69c0-.75.584-1.34 1.326-1.34.744 0 1.327.59 1.327 1.34V.8z"/>
        </svg>
      );
    }
    case 'position': {
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 14 20">
          <path id="a" d="M7 0C3.135 0 0 3.135 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.865-3.135-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z"/>
        </svg>
      );
    }
    case 'project2': {
      return (
        <svg className={className} height="100%" viewBox="0.45 0.744 31.432 32.598">
          <path d="M31.132 17.613c.414 0 .75-.335.75-.75v-2.71c0-.007-.003-.012-.003-.018-.003-.057-.02-.11-.034-.164-.01-.04-.014-.083-.03-.12-.02-.042-.05-.075-.075-.112-.028-.042-.05-.087-.088-.123-.027-.026-.063-.042-.095-.064-.05-.034-.096-.07-.15-.092-.007-.002-.01-.007-.016-.01L16.426 7.944h-.005v-1.85h2.26v.333c0 .414.336.75.75.75h3.264c.414 0 .75-.336.75-.75V2.578c0-.414-.336-.75-.75-.75h-2.51v-.334c0-.414-.336-.75-.75-.75H16.17c-.09 0-.17.022-.25.05-.08-.028-.16-.05-.25-.05-.414 0-.75.336-.75.75v6.812L.94 13.45c-.004 0-.008.006-.013.008-.057.022-.103.06-.152.093-.03.023-.068.04-.095.065-.037.036-.06.082-.09.124-.024.036-.055.068-.073.11-.018.038-.02.082-.03.124-.015.054-.032.105-.034.16 0 .007-.003.012-.003.02v2.71c0 .414.336.75.75.75h1.44v11.518H1.2c-.414 0-.75.336-.75.75v2.71c0 .415.336.75.75.75h29.932c.414 0 .75-.335.75-.75v-2.71c0-.414-.336-.75-.75-.75H29.71v-11.52h1.422zM20.18 5.363c0-.008.004-.014.004-.02V3.327h1.76v2.348H20.18v-.314zm-3.26-3.12h1.764v.315c0 .007-.004.013-.004.02v2.014h-1.76V2.244zm13.462 28.388v1.212H1.95v-1.21h28.432zM4.14 29.13V17.614h1.22V29.13H4.14zm2.72 0V17.614h3.4V29.13h-3.4zm4.9 0V17.614h1.22V29.13h-1.22zm2.72 0V17.614h3.39V29.13h-3.39zm4.89 0V17.614h1.22V29.13h-1.22zm2.72 0V17.614h3.4V29.13h-3.4zm4.9 0V17.614h1.22V29.13h-1.22zM1.95 16.115v-1.438l14.216-5.23 14.216 5.23v1.438H1.95z"/>
        </svg>
      );
    }
    case 'home': {
      return (
        <svg className={className} height="100%" viewBox="0 0 32 26">
            <path id="a" d="M15.979 0c-.17.004-.326.058-.477.16L.303 11.978c-.35.277-.4.787-.137 1.12.258.33.807.382 1.137.124l14.7-11.424 14.7 11.424c.33.258.865.203 1.125-.123.26-.325.23-.864-.125-1.122l-5.7-4.43V.787c0-.435-.358-.788-.8-.788h-3.2c-.442 0-.8.353-.8.788v3.028L16.503.16c-.178-.115-.357-.163-.524-.16zm6.823 1.576h1.6v4.727l-1.6-1.243V1.576zm-18.4 10.267l1.6-1.243v13.037h6v-7.09c0-.437.36-.79.8-.79h6.4c.442 0 .8.353.8.79v7.09h6V10.6l1.6 1.243v12.58c0 .437-.358.79-.8.79h-7.6c-.44 0-.8-.353-.8-.79v-7.09h-4.8v7.09c0 .437-.358.79-.8.79h-7.6c-.44 0-.8-.353-.8-.79v-12.58z"/>
        </svg>
      );
    }
    case 'profile': {
      return (
        <svg className={className} height="100%" viewBox="0.1 0.102 27.795 27.794">
          <path d="M13.998.102C6.315.102.1 6.316.1 14s6.215 13.897 13.897 13.897c7.683 0 13.898-6.214 13.898-13.897S21.68.102 13.998.102zm8.74 22.843c-1.81-3.107-5.12-5.02-8.775-5.02-3.62 0-6.965 1.947-8.775 5.02C2.9 20.692 1.466 17.517 1.466 14c0-6.932 5.634-12.532 12.53-12.532 6.9 0 12.533 5.6 12.533 12.532 0 3.517-1.434 6.692-3.79 8.945z"/>
          <path d="M14.003 5.224c-3.005 0-5.463 2.458-5.463 5.463s2.458 5.463 5.463 5.463c3.004 0 5.463-2.458 5.463-5.463s-2.458-5.463-5.463-5.463zm0 9.56c-2.253 0-4.097-1.843-4.097-4.097 0-2.254 1.844-4.098 4.097-4.098 2.254 0 4.098 1.843 4.098 4.097.002 2.254-1.842 4.098-4.097 4.098z"/>
        </svg>
      );
    }
    default:
      return null;
  }
};

const Icon: React.SFC<IIcon> = ({ name, className }) => getIcon(name, className);

interface IIcon {
  name: string;
  className?: string;
}

export default Icon;
