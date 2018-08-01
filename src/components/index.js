import AmPagination from './AmPagination'

const Amplugin ={
    install :function (Vue) {
        Vue.component(AmPagination.name, AmPagination)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Amplugin)
}

export default Amplugin