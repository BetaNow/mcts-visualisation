<template>
    <h1>MCTS Tic-Tac-Toe Visualiser </h1>
    <p>{{ message }}</p>
    <button @click="runMCTS">Run</button>
</template>

<script>
import { MCTS } from "@/assets/ts/mcts";

export default {
    name: 'App',
    data () {
        return {
            message: 'Hello Vue!',
            board: Array(9).fill(-1),
        }
    },
    methods: {
        runMCTS() {
            const mcts = new MCTS(this.board, 0);
            console.log(mcts.search(1000));
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/main';

</style>
