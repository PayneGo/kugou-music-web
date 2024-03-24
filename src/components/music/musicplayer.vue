<template>
  <n-space justify="space-between">
    <n-flex class="mp3-player" justify="space-between"></n-flex>
    <audio ref="audioPlayer" :src="currentSongUrl" @timeupdate="updateProgress"></audio>

<!-- 上一首键 -->
<n-icon
      @click="previousMusic"
      size="40"
      color="green"
      depth="4"
      :component="Previous20Regular"
    />

<!-- 播放键 -->
    <n-icon
      @click="playPause"
      v-if="!isPlaying"
      size="40"
      color="green"
      depth="4"
      :component="Play20Regular"
    />

<!-- 暂停键 -->
    <n-icon
      @click="playPause"
      v-if="isPlaying"
      size="40"
      color="green"
      depth="4"
      :component="Pause20Regular"
    />

    <!-- 下一首键 -->
    <n-icon
      @click="nextMusic"
      size="40"
      color="green"
      depth="4"
      :component="Next20Regular"
    />

    <n-avatar
      class="rotating-element"
      :size="40"
      :src="currentSongCover"
      v-if="currentSongCover"
    />

    <n-space justify="space-between" class="progress">
      <!-- 进度条 -->
      <n-slider
        style="width: 500px"
        v-model:value="currentTime"
        :max="audioDuration"
        :step="1"
        :tooltip="false"
        :on-dragend="seek"
        :on-dragstart="dragStartProgress"
        @change="updateProgress"
      >
      <template #thumb>
        <n-icon-wrapper :size="24" :border-radius="12">
          <n-icon :size="18" :component="MusicNote124Filled" />
        </n-icon-wrapper>
      </template>
      </n-slider>
      <span>{{ formatTime(currentTime) }} / {{ formatTime(audioDuration) }}</span>

      <n-icon size="40" color="green" depth="4" :component="IosVolumeHigh" />
      <!-- 音量进度条 -->
      <n-slider
        style="width: 100px"
        :step="0.01"
        :min="0"
        :max="1"
        :tooltip="false"
        v-model:value="volume"
        :on-dragend="adjustVolume"
      ></n-slider>
    </n-space>

    <!-- <select v-model="selectedSong" @change="changeSong" class="song-selector">
      <option v-for="(song, index) in songs" :key="index" :value="song.url">
        {{ song.name }}
      </option>
    </select> -->
    <n-popover placement="top" trigger="click">
      <template #trigger>
        <n-icon size="40" i-if="true" depth="4" :component="AppsListDetail20Regular" />
      </template>
      <!-- <div v-for="(song, index) in songs" @chick="changeSong" >
      {{ index }} -{{ song.name }}
    </div> -->
      <n-list hoverable clickable>
        <template #header> 播放列表 </template>
        <n-scrollbar style="max-height: 50vh">
          <n-list-item
            v-for="(song, index) in songs"
            style="width: 60vh"
            @click="changeSong(song)"
          >
            <div>{{ index }} - {{ song.name }}</div>
          </n-list-item>
        </n-scrollbar>
      </n-list>
    </n-popover>
  </n-space>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Play20Regular,
  Pause20Regular,
  AppsListDetail20Regular,
  Next20Regular,
  Previous20Regular,
  MusicNote124Filled,
} from "@vicons/fluent";

import { IosVolumeHigh } from "@vicons/ionicons4";

const audioPlayer = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const volume = ref(1);
const selectedSong = ref("");
const currentTime = ref(0);
const audioDuration = ref(0);
const dragStatus = ref(false);
const songs = ref([
  {
    no: 1,
    name: "Song 1",
    url:
      "http://fsmobile.ali.kugou.com/202403221514/7925279a9d317b2713cdb224d746619d/v3/be5f55f91ce08e4cbe7a6cb2e12a403b/yp/full/a1005_u495399625_m336d5ebc5436534e61d16e63ddfca327_p2_mx0_q128_s4048312302.mp3",
    cover: "http://imge.kugou.com/stdmusic/150/20220331/20220331074119345079.jpg",
  },
  {

    no: 2,
    name: "Song 2",
    url:
      "http://fsmobile.hw.kugou.com/202403221619/73c8e8ce3b44243f308f9b313c4b125d/v2/360f3b0e2a24dd12b9c626553ff758b0/G354/M06/72/07/QpUEAGUj-M6APAhBABt7RjuqiA0416.mp3",
    cover: "http://imge.kugou.com/stdmusic/150/20220331/20220331074119345079.jpg",
  },
  // Add more songs as needed
]);
// 音乐列表当前id
const musicListIndex = ref(0);

const currentSongUrl = computed(() => {
  return selectedSong.value;
});

const currentSongCover = computed(() => {
  const song = songs.value.find((song) => song.url === selectedSong.value);
  return song ? song.cover : "https://imge.kugou.com/stdmusic/";
});

const playPause = () => {
  if (!audioPlayer.value) return;

  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const adjustVolume = () => {
  if (!audioPlayer.value) return;

  audioPlayer.value.volume = volume.value;
};

const changeSong = (song) => {
  selectedSong.value = song.url;
  musicListIndex.value = song.no;
  if (!audioPlayer.value || !selectedSong.value) return;
  audioPlayer.value.src = selectedSong.value;
  const playObject = audioPlayer.value.play();

  if (playObject !== undefined) {
    playObject.then(_ => {
      // Automatic playback started!
      // Show playing UI.
    })
    .catch(error => {
      audioPlayer.value.play();
    });
  }
  isPlaying.value = true;
};

const updateProgress = () => {
  if (!audioPlayer.value || dragStatus.value) return;

  currentTime.value = Math.floor(audioPlayer.value.currentTime);
  audioDuration.value = audioPlayer.value.duration;
};

const seek = () => {
  dragStatus.value = false;
  if (!audioPlayer.value) return;
  audioPlayer.value.currentTime = currentTime.value;
};

const dragStartProgress = () => {
  dragStatus.value = true;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const playMusicByIndex = (index: Number) => {
  console.log(index)
  const song = songs.value.filter(o => o.no == index)
  console.log(song)
  changeSong(song[0]);
}

const previousMusic = () => {
  musicListIndex.value--
  playMusicByIndex(musicListIndex.value)
}

const nextMusic = () => {
  musicListIndex.value++
  playMusicByIndex(musicListIndex.value)
}
</script>

<style scoped>
.mp3-player {
  width: 100%;
  text-align: center;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.progress {
  top: 0px;
  margin: 0 10px;
  padding: 12px;
}

.progress > slider {
  position: relative;
  top: 3px;
  width: 500px;
}

.cover {
  width: 100px;
  height: 100px;
  margin: 0 10px;
}

.song-selector {
  width: 150px;
  margin: 0 10px;
}

.rotating-element {
  /* border-radius: 50%; */
  transition: transform 0.5s ease;
  /* 添加过渡效果 */
}

.musicImg {
  border-radius: 50%;
}
</style>
