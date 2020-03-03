<template>
<div class="wrap">

    {{ activeFiltersDuration }}

    <pre style="position:fixed; background: rgba(0,0,0,.9); padding:20px; right:10px; top:10px; color:lime; width:360px; overflow:scroll">
<button type="button" @click="loadDurationsUI()" name="button">Log duration</button>
        <br />
    {{ this.countries[1] }}
    </pre>

    <div class="sidebar -pane">
        <h4>Filters:</h4>

        <fieldset name="duration" class="dd"><label class="filter-duration">
                <input type="checkbox" v-model="selectAll" checked="checked"> Any duration</label>
            <label class="filter-duration" v-for="duration in durationList"><input type="checkbox" v-model="activeFiltersDuration" :value="duration.duration">{{duration.caption}}</label>
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
                    <h4 v-if="single.project_name">{{single.project_name}}</h4>

                    <b>Fees:</b>

                    <div class="grid__ _col-2">
                        <div class="col">
                            <table>
                                <tr v-for="fees in single.fees">
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
            </dt>

            <dd>
            </dd>
        </dl>

    </div>
</div>
</template>

<script>
export default {
    name: 'Projects',
    data() {
        return {
            currency: 'USD',
            activeFiltersDuration: []
        }
    },

    computed: {
        countries: function() {
            return this.$store.state.projects
        },
        filteredProjects: function() {
            //filter
        },
        durationList: function() {
            return this.getduration()
        },

        selectAll: {
            get: function() {
                return this.activeFiltersDuration ? this.activeFiltersDuration.length == this.durationList.length : false;
            },
            set: function(value) {
                var activeFiltersDuration = [];
                if (value) {
                    this.durationList.forEach(function(s) {
                        activeFiltersDuration.push(s.duration);
                    });
                }
                this.activeFiltersDuration = activeFiltersDuration;
            }
        }
    },


    methods: {
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

        getduration: function() {
            let dur = {}
            let arr = []

            this.countries.map(el => { //thows error
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
            return arr;
        },

        loadDurationsUI() {
            //select all checkboxes
            this.activeFiltersDuration =[]
            this.durationList.map(el => {
                this.activeFiltersDuration.push(el.duration)
            })
            alert(activeFiltersDuration)
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
    },
    mounted(){
        console.log('mounted');
        this.loadDurationsUI()}
}
</script>
