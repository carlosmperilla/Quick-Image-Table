// For Nuxt 3
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
        faBars, 
        faBarsStaggered,
        faHouse,
        faInfoCircle,
        faComments,
        faCircleCheck,
        faDumpsterFire,
        faCirclePlus,
        faPanorama,
        faTableCells,
        faArrowLeft,
        faArrowRight,
        faCamera,
        faCameraRotate,
        faFileZipper,
        faFilePdf,
        faHandPointUp,
        faCircleXmark,
        faFaceMeh,
        faRobot,
        faSpinner
      } from '@fortawesome/free-solid-svg-icons'
import { faReadme } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
// library.add(fas, fab)
library.add(
  faBars, 
  faBarsStaggered,
  faHouse,
  faInfoCircle,
  faComments,
  faCircleCheck,
  faDumpsterFire,
  faCirclePlus,
  faPanorama,
  faTableCells,
  faArrowLeft,
  faArrowRight,
  faCamera,
  faCameraRotate,
  faFileZipper,
  faFilePdf,
  faHandPointUp,
  faCircleXmark,
  faReadme,
  faFaceMeh,
  faRobot,
  faSpinner
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})