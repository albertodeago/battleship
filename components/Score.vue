<template>
    <div class="score text-lg text-center">
        <div class="score__shots">
            Congratulations, you won, using a totality of <span class="font-medium">{{ game.shotsFired }}</span> shots.<br>
            To start another game click the bottom above!
        </div>
        <div class="score__best" v-if="bestScore > 0">
            Your best score of all time is <span class="font-medium">{{ bestScore }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Game } from "@/core"
import { Config } from "@/config"

export default Vue.extend({
    name: "Score",

    props: {
        game: Object as PropType<Game>,
    },

    data: () => ({
        bestScore: 0 as number
    }),

    /**
     * Retrieve user previous best score, and update if needed
     */
    created() {
        const savedScore = localStorage.getItem(Config.STORAGE.BEST_SCORE_KEY) || "0"
        this.bestScore = parseInt(savedScore, 10)

        if (this.bestScore > this.game.shotsFired || this.bestScore === 0) {
            localStorage.setItem(Config.STORAGE.BEST_SCORE_KEY, String(this.game.shotsFired))
            this.bestScore = this.game.shotsFired
        }
    }
})
</script>