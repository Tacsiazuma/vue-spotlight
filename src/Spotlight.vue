<template>
        <div class="overlay" v-show="widgetOpen">
            <global-events v-if="widgetOpen && open()"
            @keyup.up="up"
            @keyup.down="down"
            @keyup.tab="complete"
            @keyup.enter="select" />
        <div class="search-bar">
        <div class="search-icon">
            <font-awesome-icon icon="search" size="2x" />
        </div>
        <focus-lock :disabled="!widgetOpen">
            <input @input="update" type="text" class="search-input" spellcheck="false" placeholder="Spotlight Search" autofocus v-model="term" />
        </focus-lock>
        <span class="autocomplete">{{suggestion}}</span>
        </div>
        <div class="hits" v-bind:class="{open : open}">
        <ul>
            <li v-for="(item, index) in filtered" v-scrollto v-bind:key="item[fieldName]" class="hit-result" v-bind:class="{selected : selected(index)}"
                v-html="matchRenderer(item, fieldName)"></li>
            </ul>
        </div>
    </div>
</template>

<script>
import {library} from "@fortawesome/fontawesome-svg-core"
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import GlobalEvents from 'vue-global-events'
import FocusLock from 'vue-focus-lock'
library.add(faSearch);

export default {
    name: "Spotlight",
    data() {
        return {
            term : "",
            selectedIndex : -1,
            suggestion: "",
            filtered: [],
            result: []
        }
    },
    props : {
        action : {
            type: Function,
            required: true
        },
        widgetOpen : {
            type : Boolean,
            required : true
        },
        fieldName : {
            type: String,
            default : "title"
        },
        comparingFunction : {
            type: Function,
            default : (field, term) => {
                return field.startsWith(term);
            }
        },
        dataProvider : {
            type : Function,
            required : true
        },
        matchRenderer: {
            type: Function,
            default : (item, fieldName) => 
                `<img class="hit-result-image" v-bind:src="${item.image}"/><span>${item[fieldName]}</span></li>`
        }
    },
    methods: {
        up() {
            this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        },
        down() {
            this.selectedIndex = Math.min(this.selectedIndex + 1, this.filtered.length -1);
        },
        complete() {
            if (this.selectedIndex == -1) {
                this.term = this.suggestion;
                this.update();
            }
        },
        select() {
            if (this.selectedIndex > -1) {
                const elem = this.filtered[this.selectedIndex];
                this.selectedIndex = -1;
                this.filtered = [];
                this.term = "";
                this.action(elem);
            }
        },
        open() {
            return this.filtered.length > 0
        },
        selected(index) {
            return this.selectedIndex === index;
        },
        update() {
            if (this.term === '') {
                this.suggestion = ''
            }
            this.dataProvider(this.term)
                .then(data => this.result = data)
                .then(() => this.filtered = this.result.filter(elem => this.comparingFunction(elem[this.fieldName], this.term)))
                .then(() => {
                    if (this.open() && this.term !== '') {
                        this.suggestion = this.filtered[0][this.fieldName];
                    } else {
                        this.suggestion = "";
                    }
                });            
        }
    },
    directives: {
        scrollto: {
            update(el) {
                if (el.classList.contains("selected")) {
                    el.scrollIntoView({block : 'nearest'});
                }
            }
        }
    },
    components: {
        FontAwesomeIcon, GlobalEvents, FocusLock
    }
};
</script>

<style>
.overlay {
    top: 20%;
    left: 50%;
    width: 680px;
    z-index: 100;
    font-size: 12px;
    overflow: hidden;
    border-radius: 6px;
    position: absolute;
    margin-left: -340px;
    letter-spacing: .3px;
    font-family: Verdana, "Lucida Sans Unicode", sans-serif;
    box-shadow: 0 12px 15px 0 rgba(0,0,0,0.24),
    0 17px 50px 0 rgba(0,0,0,0.19);
}
.search-bar {
    z-index: 10;
    height: 55px;
    display: flex;
    justify-content: left;
    align-items: center;
    position: relative;
    background-color: rgba(0,21,41,0.918);
}
.search-icon {
    width: 22px;
    height: 22px;
    margin: 16px;
    position: static;
    background-size: cover;
}
.search-icon > svg {
    color: #a6a6a6;
}
.search-input {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 22px;
    height: 55px;
    font-weight: 300;
    padding-left: 5px;
    box-sizing: content-box;
    border: none!important;
    outline: none!important;
    max-width: 450px!important;
    background-color: transparent;
    z-index: 900;
    font-family: sans-serif;
    letter-spacing: .3px;
}
.search-input::-moz-placeholder {
    color: #a6a6a6;
}
.search-input::-webkit-input-placeholder {
    color: #a6a6a6;
}
.autocomplete {
    height: 55px;
    position: absolute;
    top: 14px;
    left: 60px;
    margin: 0;
    padding: 0;
    color: #a6a6a6;
    font-size: 22px;
    font-weight: 300;
    font-family: sans-serif;
    letter-spacing: .3px;
}
.hits {
    max-height: 0;
    min-height: 0;
    transition: all 0.3s;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style:none;
}
.hits::-webkit-scrollbar {
    display: none;
}
.hits.open {
    max-height: 190px;
    border-top: 1px solid #515253
}
ul,li {
    margin:0;
    padding: 0;
    width: 100%;
    list-style-type: none;
}
.hit-result {
    color: #fff;
    cursor: pointer;
    font-size: 22px;
    font-weight: 100;
    background-color: rgba(0,21,41,0.918);
    padding: 6px 6px 6px 0 !important;
    display: flex;
    justify-content: left;
    align-items: center;
}
.hit-result.selected {
    background-color: #0093f8;
}
.hit-result-image {
    padding: 0 10px 0 10px;
}

</style>
