import { I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui-react";

function setTranslations() {
    I18n.putVocabularies(translations);
    I18n.setLanguage("zh");
    I18n.putVocabulariesForLanguage("zh", {
        "Account recovery requires verified contact information": "账号验证需要验证联系信息",
        "Add your Profile": "添加您的个人资料",
        "Add your Website": "添加您的个人网址",
        "Back to Sign In": "返回登录",
        "Change Password": "修改密码",
        Changing: "修正中",
        Code: "验证码",
        "Confirm Password": "确认密码",
        "Confirm Sign Up": "确认注册",
        "Confirm SMS Code": "确认 SMS 验证码",
        "Confirm TOTP Code": "确认 TOTP 验证码",
        Confirm: "确认",
        "Confirmation Code": "确认码",
        Confirming: "确认中",
        "Create a new account": "创建新账号",
        "Create Account": "创建账号",
        "Creating Account": "创建账号中",
        "Dismiss alert": "关闭警告",
        Email: "电子邮件",
        "Enter your Birthdate": "输入您的生日",
        "Enter your code": "输入您的验证码",
        "Enter your Confirmation Code": "输入您的验证码",
        "Enter your Email": "输入您的电子邮件",
        "Enter your Family Name": "输入您的姓氏",
        "Enter your Given Name": "输入您的名字",
        "Enter your Middle Name": "输入您的中间名",
        "Enter your Name": "输入您游戏内的昵称，以验证身份",
        "Enter your Nickname": "输入您的昵称",
        "Enter your Password": "输入您的密码",
        "Enter your phone number": "输入您的电话号码",
        "Enter your Preferred Username": "输入您的首选用户名",
        "Enter your username": "输入您的用户名",
        "Forgot password?": "忘记密码?",
        "Forgot your password?": "忘记密码?",
        "Hide password": "隐藏密码",
        "It may take a minute to arrive": "可能需要一点时间才能到达",
        Loading: "加载中",
        "New password": "新密码",
        or: "或者",
        Password: "密码",
        "Phone Number": "电话号码",
        "Please confirm your Password": "请确认您的密码",
        "Resend Code": "重新发送验证码",
        "Reset your password": "重置您的密码",
        "Reset your Password": "重置您的密码",
        "Send code": "发送验证码",
        "Send Code": "发送验证码",
        Sending: "发送中",
        "Setup TOTP": "设置 TOTP",
        "Show password": "显示密码",
        "Sign in to your account": "登录您的账号",
        "Sign In with Amazon": "用 Amazon 登陆",
        "Sign In with Apple": "用 Apple 登陆",
        "Sign In with Facebook": "用 Facebook 登陆",
        "Sign In with Google": "用 Google 登陆",
        "Sign in": "登录",
        "Sign In": "登录",
        "Signing in": "登录中",
        Skip: "跳过",
        Submit: "提交",
        Submitting: "提交中",
        Username: "用户名",
        Name: "游戏昵称",
        "Verify Contact": "验证联系信息",
        Verify: "验证",
        "We Emailed You": "我们已经发送邮件给您",
        "We Sent A Code": "我们已经发送验证码给您",
        "We Texted You": "我们已经发送短信给您",
        "Your code is on the way. To log in, enter the code we emailed to":
            "验证码已经发送到您的邮箱。请输入验证码后登陆",
        "Your code is on the way. To log in, enter the code we sent you": "您的验证码已在发送中。请输入验证码后登陆",
        "Your code is on the way. To log in, enter the code we texted to":
            "验证码已经发送到您的手机。请输入验证码后登陆",
    });
}

export default setTranslations;
