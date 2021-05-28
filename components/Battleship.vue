<template>
    <div class="battleship flex align-center justify-center">
        <div class="battleship__grid">

            <div class="battleship__grid__empty-cell inline-block align-top w-8 h-8"/><div
                class="inline-flex items-center justify-center align-top w-8 h-8 font-medium"
                v-for="(row, i) in game.grid.grid"
                :key="`heading-${i}`"
            >
                {{ numToChar(i).toUpperCase() }}
            </div>

            <div 
                v-for="(row, i) in game.grid.grid"
                :key="`row-${i}`"
            >
                <div class="inline-flex items-center justify-center align-top w-8 h-8 font-medium">
                    {{ i + 1 }}
                </div><div
                    class="inline-block align-top text-center w-8 h-8 border border-black"
                    v-for="(cell, j) in row"
                    :key="`cell-${j}`"
                >
                    <div class="h-full cursor-pointer hover:scale-50 transition"
                        @click="fire(i, j)"
                        :class="{
                            'bg-white': cell === Cell.EMPTY || cell === Cell.SHIP,
                            'bg-blue-300': cell === Cell.FIRED_MISS,
                            'bg-red-300': cell === Cell.FIRED_HIT
                        }" 
                    />
                    <!-- Add 'bg-yellow-300': cell === Cell.SHIP if you need help for debug -->
                </div>
                <br>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Game, Cell } from "@/core"
import { numToChar } from "@/helpers"

export default Vue.extend({
    name: "Battleship",

    props: {
        game: {
            type: Object as PropType<Game>,
            required: true
        }
    },

    data: () => ({
        Cell, // used to 'typecheck' in template
        numToChar // used to create grid 'header'
    }),

    methods: {

        /**
         * Fire (in the hole) on a cell
         * To do so, translate grid indexes to human readable string (e.g. "B4")
         */
        fire(r: number, c: number): void {
            const row = r + 1
            const col = numToChar(c)

            const shot = this.game.fire(`${col}${row}`)

            // this should be avoided when possible! but in this case, to re-render just a small matrix I think it's doable
            this.$forceUpdate()
        }
    }
})
</script>