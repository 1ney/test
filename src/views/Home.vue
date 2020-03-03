<template>
<div class="home">
    <h2>Available projects</h2>
    <projects />
</div>
</template>

<script>
// @ is an alias to /src
import Projects from '../components/Projects.vue'

export default {
    name: 'Home',
    methods: {},
    components: {
        'projects': Projects
    }
}
</script>
