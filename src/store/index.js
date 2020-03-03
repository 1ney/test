import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        projects: '',
        durations: [],
        isloaded: false
    },

    mutations: {
        projects(state, data) {
            state.projects = data
        },
        durations(state) {

            let dur = {}
            let arr = []

            state.projects.map(el => { //thows error
                el.projects.map(child => {
                    child.fees.map(fees => {
                        dur = {
                            duration: fees.duration_i,
                            caption: fees.duration
                        }
                        const found = arr.some(el => el.duration == dur.duration);
                        if (!found) arr.push(dur);
                    });
                });

            })

            arr.sort((a, b) => (a.duration > b.duration) ? 1 : -1)
            console.log(arr);

            state.durations = arr

        },
        isloaded(state, data) {
            state.isloaded = data
        },

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
                    commit('isloaded', true)
                    commit('durations')
                })
                .catch(err => {
                    console.log("error getting projects")
                    reject(err)
                })

        }
    },

    getters: {},

})
