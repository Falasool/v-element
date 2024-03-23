import { InjectionKey, Ref } from 'vue'

export type NameType = string | number

export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>
  /*
   * void 类型用来指示一个函数不返回任何值。
   * 换句话说，当你调用一个返回类型为 void 的函数时，
   * 这个函数执行一些操作，但是不会返回任何数据。
   * 这里的 void 用来明确表达 handleItemClick 函数的设计意图，
   * 即执行一些副作用而不需要关心任何返回结果。这是事件处理器和其他回调函数常见的用法。
   *
   * 副作用"（Side Effects）
   * 函数在执行过程中，除了返回值之外，对其外部环境（外部状态）或系统产生的影响。这些影响可以包括但不限于：
   * 修改任何外部变量或对象属性：比如，一个函数修改了全局变量的值，或者改变了传入的对象的某个属性。
   * 执行I/O操作：如打印到控制台、读写文件、发送网络请求等。
   * 抛出异常或错误：函数执行中断并抛出错误，影响程序的控制流。
   * 修改系统状态：例如，改变文件系统，修改数据库，或者通过网络请求改变服务器的状态。
   * 调用其他副作用函数：如果一个函数内部调用了另一个有副作用的函数，那么这个函数也被认为是有副作用的。
   */
  handleItemClick: (name: NameType) => void
}

/*
 * InjectionKey:
 * Vue3帮助保持提供（provide）和注入（inject）时的类型一致性
 * Provide/Inject: 父组件提供的数据所有后代组件都可以使用
 *
 * Symbol：es6提供的新原始数据类型，创建全局唯一的标识符（
 */
export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('collapseContext')

// Collapse__support-v-model

export interface CollapseProps {
  accordion?: boolean
  modelValue: NameType[]
}
export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void
  (e: 'update:change', values: NameType[]): void
}
