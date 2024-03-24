<script setup lang="ts">
import Button from './components/Button/Button.vue'
import { ButtonInstance } from './components/Button/types'
import { onMounted, ref } from 'vue'

import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icons/Icons.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import { MenuOption } from './components/Dropdown/types'

const buttonRef = ref<ButtonInstance | null>(null)
// 默认name=a的item展开
const openedValue = ref(['a'])
onMounted(() => {
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value?.ref)
  }
})
const options: MenuOption[] = [
  { key: 1, label: 'item1' },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' },
]
</script>

<template>
  <Dropdown placement="right" trigger="click" :menu-options="options">
    <img src="./assets/vue.svg" width="125px" height="125px" />
    <template #content>
      <h1>
        <p>Hello this is Tooltip component!</p>
      </h1>
    </template>
  </Dropdown>

  <Icon icon="arrow-up" size="xl" type="primary"></Icon>
  <Icon icon="arrow-up" size="xl" type="warning"></Icon>

  <div class="btn">
    <div class="btn__c1">
      <Button ref="buttonRef">Test Button regular</Button>
      <Button plain>Plain</Button>
      <Button round>Round</Button>
      <Button circle>ZzzZZ</Button>
      <Button disabled>disabled</Button>
    </div>
    <div class="btn__c2">
      <Button type="primary">Primary</Button>
      <Button type="danger">danger</Button>
      <Button type="info">info</Button>
      <Button type="warning">warning</Button>
      <Button type="success">success</Button>
    </div>
    <div class="btn__c3">
      <Button type="primary" plain>Primary</Button>
      <Button type="danger" plain>danger</Button>
      <Button type="info" plain>info</Button>
      <Button type="warning" plain>warning</Button>
      <Button type="success" plain>success</Button>
    </div>
    <div class="btn__c4">
      <Button size="large">large</Button>
      <Button size="small">small</Button>
    </div>
    <div class="btn__c5">
      <Button type="warning" loading>Loading...</Button>
      <Button icon="arrow-up">UP</Button>
    </div>
  </div>
  <!-- test -->
  <Collapse v-model="openedValue" accordion>
    <Item name="a" title="Title A">
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </Item>
    <Item name="b" title="Title B">
      <div>this is bbbbb test</div>
    </Item>
    <Item name="c" title="Disabled Title" disabled>
      <div>this is cccc test</div>
    </Item>
  </Collapse>
  <p>openedValue 展开的item: {{ openedValue }}</p>
</template>

<style scoped>
.btn {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
