<template>
    <div class="flex flex-col items-center justify-center">
        <button 
            class="my-4 py-4 w-60 px-16 inline-block text-xl bg-gray-100 text-black hover:bg-gray-900 hover:text-white transition"
            @click="startGame"
        >
            NEW GAME
        </button>

        <template v-if="game">
            <transition name="fade" mode="out-in">
                <Battleship 
                    class="my-4"
                    :game="game"
                />
            </transition>
            <Score
                v-if="game.isGameEnded" 
                :game="game"
            />
        </template>
        <template v-else>
            <transition name="fade" mode="out-in">
                <div class="text-center">
                    Welcome to <span class="font-medium">Battleship</span><br>
                    Your goal is to sink all the ships, there will be 3 randomly placed ships, one long 5 squares and two long 4.<br>
                    When you click a cell it will turn blue if you missed, red if you hit a boat. <br>
                    To start a game click the button above. Good luck
                </div>
            </transition>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Game } from "@/core"

export default Vue.extend({
    name: "Index",

    data: () => ({
        game: null as Game | null
    }),

    methods: {
        startGame(): void {
            this.game = new Game()
        }
    }
})
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
