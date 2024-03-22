<template>
  <div class="mp3-player">
    <audio
      ref="audioPlayer"
      :src="currentSongUrl"
      @timeupdate="updateProgress"
    ></audio>

    <n-icon
      @click="playPause"
      v-if="!isPlaying"
      size="40"
      color="green"
      depth="4"
      :component="PlayCircle20Regular"
    />

    <n-icon
      @click="playPause"
      v-if="isPlaying"
      size="40"
      color="green"
      depth="4"
      :component="PauseCircle20Regular"
    />

    <input
      type="range"
      min="0"
      :max="audioDuration"
      step="1"
      v-model="currentTime"
      class="progress"
      @input="seek"
    />
    <span>{{ formatTime(currentTime) }} / {{ formatTime(audioDuration) }}</span>
    <img
      :style="{ transform: `rotate(${currentTime * 30}deg)` }"
      class="rotating-element"
      round
      size="20"
      :src="currentSongCover"
      v-if="currentSongCover"
      id="musicImg"
    />
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      v-model="volume"
      class="volume"
      @input="adjustVolume"
    />
    <select v-model="selectedSong" @change="changeSong" class="song-selector">
      <option v-for="(song, index) in songs" :key="index" :value="song.url">
        {{ song.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { PlayCircle20Regular, PauseCircle20Regular } from "@vicons/fluent";

const rotation = ref(0);
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

const changeSong = () => {
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
  text-align: center;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

button {
  margin: 0 10px;
}

.progress {
  flex: 1;
  margin: 0 10px;
}

.cover {
  width: 100px;
  height: 100px;
  margin: 0 10px;
}

.volume {
  width: 100px;
  margin: 0 10px;
}

.song-selector {
  width: 150px;
  margin: 0 10px;
}

button {
  border: none;
  background-color: transparent;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
}

.rotating-element {
  transition: transform 0.5s ease; /* 添加过渡效果 */
}

.musicImg {
  border-radius: 50%;
}
</style>
