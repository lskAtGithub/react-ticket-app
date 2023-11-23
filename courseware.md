# react-ticket-app 开发步骤

讲述了开发者如何逐步搭建项目的简单流程以及各个插件的文档以及简单用法。

### create next app
首先执行 `npx create-next-app@latest` 通过nextjs脚手架初步搭建项目，在GUI构建项目时勾选:

 - TS
 - ESLint
 - Tailwind CSS
 - App Router

使用了App Router路由会自动定义为app下的文件夹名（部分特殊名字除外）, 入口文件为文件夹下`page.tsx`
项目搭建完成后简单清理一下项目中无用的代码，准备工作就算完成了

### 引入第三方登录平台
本项目的登录功能使用了`clerk`, 直接点进[clerk/nextjs](https://clerk.com/docs/quickstarts/nextjs)按照文档步骤执行
 1. 安装 `npm install @clerk/nextjs`
 2. 在`.env`文件中 Set environment keys
 3. 在`layout.tsx`加入 `ClerkProvider`
 4. 根目录下新建 ` middleware.ts `，代码照搬，接着修改一下`matcher: ['/']`
 5. 在` page.tsx ` 中添加 ` UserButton  `
 6. 根据文档自定义[登录](https://clerk.com/docs/components/authentication/sign-in)和[注册](https://clerk.com/docs/components/authentication/sign-up)

至此完成登录

### 项目的UI配置
项目UI库使用的是 nextUI，根据[nextui文档](https://nextui.org/docs/guide/installation)安装配置

引入UI配置之后继续安装[nextui theme](https://nextui.org/docs/customization/theme),按照文档安装配置即可，有些已经配置了的就不用重复配置了

图标库使用的是 [lucide-react](https://lucide.dev/guide/packages/lucide-react) , 这个用法比较简单，安装之后引入对应图标即可使用

全部安装好之后选个icon用来控制主题切换

### 使用 prisma 定义接口
首先安装以及配置 `prisma`， [prisma使用文档](https://www.prisma.io/docs)， 不熟悉的可以先简单看看文档了解一下，根据[prisma安装文档](https://www.prisma.io/docs/concepts/overview/what-is-prisma)安装，这里我选用的是mysql，以mysql举例：

 1. 执行 ` npm install @prisma/client mysql2 `
 2. 在 .env 文件中配置数据库连接， root是账号，password是密码，mydb是数据库名:
    ```
    MYSQL_URL=mysql://  root:password@localhost:3306/mydb
    ```

 3. 初始化`prisma` 执行：
    ```
    npx prisma init --datasource-provider mysql
    ```
    执行之后就可以在根目录下看到`prisma/schema.prisma`文件了，模型会在这里面定义，如何定义模型可参考文档


 4. 定义模型之后同步给数据库，执行指令：
    ```
    npx prisma db push
    ```

### 用户管理
首先定义一个 User 模型用于用户管理，接着去 `middleware.ts`中登录时，查询数据库，如果没有查到该用户数据，往数据库新增该用户

### 发布话题
 1. 定义一个 Topic 模型，这里需要注意的是由于 mysql 不支持数组，所以这里存储使用了 Json 类型， 也可以去另一个表来做关联，只是定义 Json 比较简单。 
 2. 定义模型之后执行 ` npx prisma db push `同步数据库
 3. 使用`nextui`完成发布话题UI布局，这里需要用到图片上传，还是使用第三方库`cloudinary`
 4. 根据[cloudinary文档](https://next.cloudinary.dev/installation)安装上传图片库，env中的name值即为控制台`Cloud Name`字段值，它提供了很多中上传的方式，我使用的是[clduploadbutton](https://next.cloudinary.dev/clduploadbutton/basic-usage), 使用需要打开 `左下角设置图标 - Upload - presets:
Unsigned uploading enabled`， 拿到第一行的 name 值作为`clduploadbutton``zhong` 中 `uploadPreset` 的值
