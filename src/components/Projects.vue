<template>
<div class="wrap" v-if="this.$store.state.isloaded">
    <!-- placeholder for loading screen -->

    <pre style="position:fixed; background: rgba(0,0,0,.9); padding:20px; right:10px; top:10px; color:lime; width:360px; overflow:scroll">
<button type="button" name="button">Log duration</button>
        <br />
    {{ this.countries[1] }}
    </pre>

    <div class="sidebar -pane">
        <h4>Filters:</h4>

        <fieldset name="duration" class="dd">
            <label class="filter-duration" v-for="duration in durationList"><input type="checkbox" v-model="activeFilters" :value="duration.duration">{{duration.caption}}</label>
        </fieldset>

        <h4>Currency:</h4>
        <fieldset name="currency" class="dd">
            <input type="radio" value="USD" id="USD" v-model="currency" name="currency"> <label for="USD">USD</label>
            <input type="radio" value="GBP" id="GBP" v-model="currency" name="currency"> <label for="GBP">GBP</label>
        </fieldset>

        <label></label>
    </div>

    <div class="projects">

        <dl v-for="country in countries" v-if="checkDuration(country)" class="country -pane">
            <dt>

                <h3><img :src="'/assets/img/flags/' + country.country_code + '.svg'" alt="" class="flag"> {{ country.name }}</h3>

                <div v-for="single in country.projects" class="">

                    <h4 v-if="single.project_name">{{ single.project_name }}</h4>
                    <template v-if='hideProjects(single.fees)'>
                        <div class="project">

                            <b>Fees:</b>

                            <div class="grid__ _col-2">
                                <div class="col">
                                    <table>
                                        <tr v-for="fees in single.fees" :class="highlight(fees)">
                                            <td>{{ fees.duration }}</td>
                                            <td>{{ costs(fees) }}</td>
                                        </tr>
                                    </table>
                                </div>

                                <div v-if="single.fees_disclaimer.length > 0" class="col">
                                    <div class="alert -disclaimer">
                                        <b>Fees disclaimer:</b> <br />
                                        <div v-for="dicslaimer in single.fees_disclaimer">
                                            {{ dicslaimer }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="single.extra_expenses" class="extra-expenses">
                                Extra expenses
                                <ul>
                                    <li v-for="expense in single.extra_expenses">
                                        {{ expense }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>

                    <template v-else>
                    <small>No projects in {{ country.name }} for selected terms.</small>
                    </template>


                </div>
            </dt>
        </dl>
        <div class="-pane" v-else>
            No projects found
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Projects',
    data() {
        return {
            currency: 'USD',
            activeFilters: [2 ,4],
        }
    },

    computed: {
        countries: {
            get() {
                return this.$store.state.projects
            },
            set(filter) {
                return filter
            }
        },

        durationList: function() {
            //generated object with all projects durations
            return this.$store.state.durations
        },

        //select all filters

        // filter: {
        //     get: function() {
        //         //this.filterProjects(this.activeFilters);
        //         return this.activeFilters ? this.activeFilters.length == this.durationList.length : false;
        //     },
        //     set: function(value) {
        //         var activeFilters = [];
        //         if (value) {
        //             this.durationList.forEach(function(s) {
        //                 activeFilters.push(s.duration);
        //             });
        //         }
        //     }
        // }
    },

    methods: {

        highlight(item) {
            let status
            if (this.activeFilters.indexOf(item.duration_i) > -1) status = 'active'

            return status
        },

        hideProjects(item) {
            let status
            if (this.activeFilters.indexOf(item) > -1) status = 'active'

            status = item.some(({
                duration_i
            }) => this.activeFilters.indexOf(duration_i) > -1)


            console.log(status);

            return status

        },

        //Filter is working but I found more easy solution.
        //for more filters I'd use filter but for a small app two-way bindings work fine

        // filterProjects(filters) {
        //     let data = this.$store.state.projects
        //
        //     let list = data.filter(country => {
        //         let res = country.projects.some(({
        //                 fees
        //             }) =>
        //             fees.some(({
        //                     duration_i
        //                 }) =>
        //                 this.activeFilters.indexOf(duration_i) > -1))
        //         return res
        //     })
        //
        //     this.countries = list
        //     console.log('countries: ' + list.map(el => el.name))
        // },

        checkDuration(country) {
            let dur = {}
            let arr = []
            country.projects.map(child => {
                child.fees.map(fees => {
                    dur = {
                        duration: fees.duration_i
                    }
                    const found = arr.some(el => el.duration == dur.duration);
                    if (found) return true
                });
            });
            return true
        },

        costs: function(i) {
            //currency switcher
            //no currency filters bc data is already filtered
            let cost = this.currency == 'USD' ? i.costs.us : i.costs.gb
            return cost + ' ' + this.currency
        }
    },


    beforeMount() {
        this.$store.dispatch('getprojects')
            .then(resp => {
                console.log('loaded')
            })
    },
    mounted() {
        //this.$store.state.projects
        console.log('mounted');
    }
}
</script>
