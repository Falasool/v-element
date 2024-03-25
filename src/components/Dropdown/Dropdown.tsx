import { Fragment, computed, defineComponent } from 'vue'
import { PropType } from 'vue'
import { Placement } from '@floating-ui/core'
import { Options } from '@popperjs/core'
import { MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
defineComponent({
  name: 'YaDropdown',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover',
    },
    transition: {
      type: String,
      default: 'fade',
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true,
    },
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
    manual: {
      type: Boolean,
    },
  },
  setup(props, { slots }) {
    const options = computed(() => {
      return props.menuOptions.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.divided ? (
              <i role="separator" class="divide-placeholder"></i>
            ) : (
              ''
            )}
            <li class="Ya-dropdown__item" id={`dropdown-item-${item.key}`}>
              {item.label}
            </li>
          </Fragment>
        )
      })
    })
    return () => (
      <div class="Ya-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
        >
          {{
            default: () => slots.default && slots.default(),
            content: () => <ul class="Ya-dropdown__menu">{options.value}</ul>,
          }}
        </Tooltip>
      </div>
    )
  },
})
