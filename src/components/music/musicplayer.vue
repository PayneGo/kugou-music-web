<template>
  <n-space justify="space-between">
    <n-flex class="mp3-player" justify="space-between"></n-flex>
    <audio ref="audioPlayer" :src="currentSongUrl" @timeupdate="updateProgress"></audio>

    <n-icon @click="playPause" v-if="!isPlaying" size="40" color="green" depth="4" :component="PlayCircle20Regular" />

    <n-icon @click="playPause" v-if="isPlaying" size="40" color="green" depth="4" :component="PauseCircle20Regular" />

    <n-avatar :style="{ transform: `rotate(${currentTime * 30}deg)` }" class="rotating-element" round :size="30"
      :src="currentSongCover" v-if="currentSongCover" />

    <!-- 进度条 -->
    <n-space justify="space-between" class="progress">
      <n-slider style="width: 500px;" v-model:value="currentTime" :max="audioDuration" :step="1" @on-update:value="updateProgress"></n-slider>
      <span>{{ formatTime(currentTime) }} / {{ formatTime(audioDuration) }}</span>

      <n-icon @click="playPause" v-if="isPlaying" size="40" color="green" depth="4" :component="PauseCircle20Regular" />
      <n-slider style="width: 100px;" :step="1" :min="0" :max="100" v-model:value="volume" @on-update:value="adjustVolume"></n-slider>
    </n-space>


    <!-- <select v-model="selectedSong" @change="changeSong" class="song-selector">
      <option v-for="(song, index) in songs" :key="index" :value="song.url">
        {{ song.name }}
      </option>
    </select> -->
    <n-popover placement="top" trigger="click" @update:show="handleUpdateShow">
      <template #trigger>
        <n-icon size="40" i-if="true" depth="4" :component="PauseCircle20Regular" />
      </template>
      <!-- <div v-for="(song, index) in songs" @chick="changeSong" >
      {{ index }} -{{ song.name }}
    </div> -->
      <n-list hoverable clickable>
        <template #header>
          播放列表
        </template>
        <n-scrollbar style="max-height: 50vh">
          <n-list-item v-for="(song, index) in songs" style="width: 60vh;" @click="changeSong(song)">
            <div >{{ index }} - {{ song.name }}</div>
          </n-list-item>
        </n-scrollbar>
      </n-list>
    </n-popover>
  </n-space>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { PlayCircle20Regular, PauseCircle20Regular } from "@vicons/fluent";

const audioPlayer = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const volume = ref(1);
const selectedSong = ref("");
const currentTime = ref(0);
const audioDuration = ref(0);
const songs = ref([
  {
    name: "Song 1",
    url: "http://fsandroid.tx.kugou.com/202403211542/a821e97025f3ae1944ca42e315e75ea1/v3/721f289d400fd06341d332063df83419/yp/full/a1005_u495399625_m336d5ebc5436534e61d16e63ddfca327_p2_mx0_q128_s1575133612.mp3",
    cover:
      "http://imge.kugou.com/stdmusic/150/20220331/20220331074119345079.jpg",
  },
  {
    name: "Song 2",
    url: "http://fsandroid.tx.kugou.com/202403211542/a821e97025f3ae1944ca42e315e75ea1/v3/721f289d400fd06341d332063df83419/yp/full/a1005_u495399625_m336d5ebc5436534e61d16e63ddfca327_p2_mx0_q128_s1575133612.mp3",
    cover:
      "http://imge.kugou.com/stdmusic/150/20220331/20220331074119345079.jpg",
  },
  // Add more songs as needed
]);

const currentSongUrl = computed(() => {
  return selectedSong.value;
});

const currentSongCover = computed(() => {
  const song = songs.value.find((song) => song.url === selectedSong.value);
  return song ? song.cover : "";
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
  if (!audioPlayer.value || !selectedSong.value) return;

  audioPlayer.value.src = selectedSong.value;
  audioPlayer.value.play();
  isPlaying.value = true;
};

const updateProgress = () => {
  if (!audioPlayer.value) return;

  currentTime.value = audioPlayer.value.currentTime;
  audioDuration.value = audioPlayer.value.duration;
};

const seek = () => {
  if (!audioPlayer.value) return;

  audioPlayer.value.currentTime = currentTime.value;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};
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
  padding: 12px
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
