<template>
   <Nav :nav-name="$t('bookmark.navName')"></Nav>
   <section class="bookmark-view">
      <div v-if="isEmptyList" class="bookmark-empty">
         <strong>
            {{ $t('bookmark.empty') }}
         </strong>
         <i class="far fa-sad-tear"></i>
      </div>
      <template v-if="!isEmptyList" v-for="item in listBookmarks" :key="item.IdMovie">
         <div class="bookmark-card">
            <img :src="item.Poster" alt="item.Poster" />
            <div class="bookmark-layer">
               <router-link :to="'/details/'+item.IdMovie" >{{ item.Title }}</router-link>
               <small>{{ item.Year }} | {{ $t('common.'+ item.Type.toLowerCase()) }}</small>
               <i @click="deleteItem(item.IdMovie)" class="fa fa-trash" ></i>
            </div>
         </div>
      </template>
   </section>
</template>

<script setup lang="ts">

   import Nav from '@/components/Nav.vue'

   import { ref, onMounted, watch } from "vue";
   import { IBookMarkCache, IMovie } from "@/types/bookmark";

   defineOptions({
      name: 'Bookmark'
   })

   const isEmptyList = ref(false)
   const listBookmarks = ref<Array<IMovie>>([])
   
   const renderBookmark = () =>  {
      let local = localStorage.getItem('listBookmark_omdb')
      if (local) {
         const localInfo:IBookMarkCache = JSON.parse(local)
         listBookmarks.value = localInfo.bookmark
         
         if (listBookmarks.value.length == 0) {
            isEmptyList.value = true
         }
      } else {
         isEmptyList.value = true
      }
   }

   const deleteItem = (id:string) => {
      const localStr = localStorage.getItem('listBookmark_omdb') as string
      let localInfo:IBookMarkCache = JSON.parse(localStr)

      localInfo.bookmark.forEach( (item, index) => {
         if ( item.IdMovie == id ) {
            localInfo.bookmark.splice(index, 1)
            localStorage.setItem('listBookmark_omdb', JSON.stringify(localInfo))
            renderBookmark()
         }
      })
   }


   onMounted(() => {
      renderBookmark()
   })

   
</script>

<style lang="scss">
   
   @import 'src/scss/view-styles/_bookmark';
   
</style>