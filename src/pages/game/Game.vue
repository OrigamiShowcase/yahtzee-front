<script setup lang="ts">
import { reactive } from 'vue';

////////

const state = reactive({
  items:[
    {
      image: getImageUrl(`items/1.png`),
      yourPoint:12,
      oppPoint:null
    },
    {
      image: getImageUrl(`items/2.png`),
      yourPoint:0,
      oppPoint:18
    },
    {
      image: getImageUrl(`items/3.png`),
      yourPoint:6,
      oppPoint:18
    },
    {
      image: getImageUrl(`items/4.png`),
      yourPoint:16,
      oppPoint:4
    },
    {
      image: getImageUrl(`items/5.png`),
      yourPoint:null,
      oppPoint:null
    },
    {
      image: getImageUrl(`items/6.png`),
      yourPoint:4,
      oppPoint:16
    },
    {
      image: getImageUrl(`items/3x.png`),
      yourPoint:null,
      oppPoint:null
    },
    {
      image: getImageUrl(`items/4x.png`),
      yourPoint:4,
      oppPoint:1
    },
    {
      image: getImageUrl(`items/full.png`),
      yourPoint:null,
      oppPoint:null
    },
    {
      image: getImageUrl(`items/small.png`),
      yourPoint:30,
      oppPoint:0
    },
    {
      image: getImageUrl(`items/large.png`),
      yourPoint:40,
      oppPoint:40
    },
    {
      image: getImageUrl(`items/yatzy.png`),
      yourPoint:null,
      oppPoint:null
    },
    {
      image: getImageUrl(`items/chance.png`),
      yourPoint:0,
      oppPoint:18
    },
  ]
})

////////

function getImageUrl(imageFile:string){
  return new URL(`../../assets/images/${imageFile}` , import.meta.url).href
}
</script>

<template>
  <div class="game">
    <div class="board">
      <div class="profile w-full p-2 bg-[var(--green-3)] !bg-opacity-75 flex items-center justify-between">
        <div></div>
        <div>
          <div class="flex items-center text-xs text-gray-100">
            <span class="bg-green-900 p-2 rounded-lg text-green-200">You: 350</span>
            <span class="mx-2">VS</span>
            <span>193 :Opp</span>
          </div>
        </div>
        <div></div>
      </div>
      <div class="w-full h-full p-2">
        <div class="results">
          <div class="results-left">
            <div></div>
            <div v-for="(item, index) in state.items.slice(0,6)" :key="index" class="results-item" :class="[index % 2 == 0 ? '' : 'bg-[var(--green-3)]']">
              <img :src="item.image" class="h-full" />
              <div class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-4)]" :class="{'!bg-[var(--green-4)] !opacity-20': item.yourPoint != null}">
                <span class="text-lg font-bold text-[var(--light-1)]">{{ item.yourPoint }}</span>
              </div>
              <div class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-5)]" :class="{'!bg-teal-600 !opacity-20': item.oppPoint != null}">
                <span class="text-lg font-bold text-[var(--light-1)] " >{{ item.oppPoint }}</span>
              </div>
            </div>
            <div class="results-item" ></div>
          </div>
          <div class="results-right">
            <div v-for="(item, index) in state.items.slice(6)" :key="index" class="results-item justify-end" :class="[index % 2 == 0 ? '' : 'bg-[var(--green-3)]']">
              <img  :src="item.image" class="h-full" />
              <div class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-4)]" :class="{'!bg-[var(--green-4)] !opacity-20': item.yourPoint != null}">
                <span class="text-lg font-bold text-[var(--light-1)]">{{ item.yourPoint }}</span>
              </div>
              <div class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-5)]" :class="{'!bg-teal-600 !opacity-20': item.oppPoint != null}">
                <span class="text-lg font-bold text-[var(--light-1)] ">{{ item.oppPoint }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="roll mt-8">
          <div class="dices">
            <div class="dices-item active">
              <img src="~/assets/images/dices/1.png" alt="">
              <span class="active-lock">
                <i class="fa fa-lock text-xs"></i>
              </span>
            </div>
            <div class="dices-item">
              <img src="~/assets/images/dices/6.png" alt="">
            </div>
            <div class="dices-item">
              <img src="~/assets/images/dices/4.png" alt="">
            </div>
            <div class="dices-item">
              <img src="~/assets/images/dices/6.png" alt="">
            </div>
            <div class="dices-item">
              <img src="~/assets/images/dices/3.png" alt="">
            </div>
          </div>
          <div class="actions">
            <q-btn color="green-6" size="lg" glossy label="Roll" class="full-width" push/>
            <q-btn color="blue-6" size="lg" glossy label="Assign" class="full-width" push/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game{
  @apply flex items-center justify-center h-screen p-0 md:p-5;
  .board{
    @apply w-[400px] h-full bg-center bg-no-repeat bg-cover #{!important};
    background-image: url("../../assets/images/global/bg-2.webp")
  }

  .results{
    @apply rounded-2xl border-4 border-[var(--green-1)] bg-[var(--green-2)] grid grid-cols-2 overflow-hidden;
    &-left , &-right{
      @apply col-span-1 flex flex-col w-full;
    }
    &-item{
      @apply p-2 w-full h-[60px] flex items-center  gap-3 ;
    }
  }
  .roll{
    @apply p-2 rounded-2xl bg-emerald-600 bg-opacity-40 relative #{!important};
    .dices{
      @apply flex items-center justify-evenly;
      &-item{
        @apply w-[55px];
      }
      .active{
        @apply border-2 border-red-500 rounded-xl relative #{!important};
        &-lock{
          @apply w-[20px] h-[20px] absolute -right-2 -top-2 text-red-500 bg-white border-2 border-red-500 rounded-full  flex-center;
        }
      }
    }
    .actions{
      @apply mt-10 flex items-center gap-2;
    }
  }
}
</style>
