# typora2chevereto

`typora`中自动上传图片至`chevereto`.

## 使用

在[releases](https://github.com/tensoar/typora2chevereto/releases)中下载打包好的可执行二进制文件，放到任一目录下，注意`linux`下要赋予可执行权限:
```bash
chmod +x typora2chevereto-linux-amd64
```

在`typora`中的图片上传设置中选择自定义，自定义命令如下：

```bash
typora2chevereto-win-x64.exe --baseUrl <baseUrl> --key <key>
```

其中：

* `<baseUrl>`: `chevereto`站点地址,`http`或`https`
* `<key>`: 密钥,管理员账号登录`chevereto`,`仪表盘`→`设置`→`API`中获取


如:
```bash
typora2chevereto-win-x64.exe --baseUrl https://mysite.com --key eaoskdjfnsawefdsfswead
```

![setting](./img/setting.png)


## 上传至某一用户

默认图片上传至管理员账户下，要上传至某一账户下，进入`chevereto`的部署目录，将`app/routes/route.api.php`文件复制到`app/routes/overrides/route.api.php`，找到:

```php
CHV\Image::uploadToWebsite($source);
```

改成:

```bash
CHV\Image::uploadToWebsite($source, '<usernameOrId>');
```

`<usernameOrId>`为目标用户的用户名或`id`.

![setting](./img/result.png)

## 打包

`clone`并执行`npm install`，打包命令如下：

* `npm run packageWin`：`windows`平台打包
* `npm run packageLinux`: `linux`平台打包
* `npm run packageMac`: `macos`平台打包(未测试)
