import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        projects: ''
    },

    mutations: {
        projects(state, data) {
            state.projects = data
        }
    },


    actions: {
        getprojects({
            commit
        }, projects) {
            //github returns 403 so I commented this part and access data locally

            // return new Promise((resolve, reject) => {
            //     axios({
            //             url: 'https://gist.github.com/robinstark/126d86cec256963927ac14dd3bae39ce', //http 403
            //             data: projects,
            //             method: 'POST'
            //         })
            //         .then(resp => {
            //             commit('projects', resp.data.data[0] )
            //             resolve(resp)
            //         })
            //         .catch(err => {
            //             console.log("error getting projects")
            //             reject(err)
            //         })
            // })//Promise

            fetch('/data/projects.json')
                .then(resp => resp.json())
                .then(json => {
                    commit('projects', json)
                    console.log('JSON parsed')
                })

                .catch(err => {
                    console.log("error getting projects")
                    reject(err)
                })

        }
    },

    getters: {},

})
