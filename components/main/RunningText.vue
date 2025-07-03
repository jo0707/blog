<template>
  <div class="running-text">
    <span>{{ displayText }}</span>
    <span class="cursor ml-[2px]" :class="{ 'cursor-blink': showCursor }">|</span>
  </div>
</template>

<script lang="ts" setup>
const displayText = ref<string>('')
const showCursor = ref<boolean>(true)
const currentIndex = ref<number>(0)

const props = defineProps<{
  text: string
  speed?: number
  cursorBlinkSpeed?: number
}>()

const speed = computed(() => props.speed || 100)
const cursorBlinkSpeed = computed(() => props.cursorBlinkSpeed || 500)

let typingInterval: NodeJS.Timeout | null = null
let cursorInterval: NodeJS.Timeout | null = null

const startTyping = () => {
  currentIndex.value = 0
  displayText.value = ''

  typingInterval = setInterval(() => {
    if (currentIndex.value < props.text.length) {
      displayText.value += props.text[currentIndex.value]
      currentIndex.value++
    } else {
      if (typingInterval) clearInterval(typingInterval)
    }
  }, speed.value)
}

onMounted(() => {
  startTyping()
})

onUnmounted(() => {
  if (typingInterval) clearInterval(typingInterval)
  if (cursorInterval) clearInterval(cursorInterval)
})

watch(() => props.text, () => {
  if (typingInterval) clearInterval(typingInterval)
  startTyping()
})
</script>

<style scoped>
.cursor-blink {
  animation: blink 1s infinite;
}

@keyframes blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}
</style>