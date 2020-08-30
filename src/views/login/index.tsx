import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';

@Component
export default class LoginPage extends Vue {
  public userName: string = '';
  public password: string | number = '';

  // 通过 @Action('loginActions') 装饰器指定 loginAction 是 store 里的 loginActions 方法
  @Action('loginActions') public loginAction;

  public login() {
    // 可以直接调用loginAction方法
    // 效果和 this.$store.dispatch('loginActions', { 参数 }) 是一样的
    this.loginAction({
      user_name: this.userName,
      password: this.password,
    }).then(() => {
      // 在store中的loginActions定义中，执行resolve方法的时机就是这里then中传入的这个函数执行的时机
      this.$router.push('/home'); // 在这跳转到home页
    });
  }

  protected render() {
    return (
      <div class='login-page'>
        <input v-model={this.userName} />
        <input
          v-model={this.password}
          type='password'
          style='margin-left: 10px;'
        />
        <button style='margin-left: 10px;' on-click={this.login}>
          登录
        </button>
      </div>
    );
  }
}
