import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '知识库',
    items: [
      { text: '技术笔记', link: '/categories/note/index', activeMatch: '/categories/note/' },
      { text: '碎碎念', link: '/categories/issues/index', activeMatch: '/categories/issues/' },
      // { text: '工具四海谈', link: '/categories/tools/index', activeMatch: '/categories/tools/' },
      // { text: '方案春秋志', link: '/categories/solutions/index', activeMatch: '/categories/solutions/' }
    ],
    activeMatch: '/categories/'
  },
  {
    text: '刷题',
    items: [
      { text: 'leetCode top 100', link: '/courses/leetcode/index', activeMatch: '/courses/leetcode/' },
      //   { text: 'MySQL快速入门', link: '/courses/mysql/index', activeMatch: '/courses/mysql/' },
      //   { text: 'MyBatis快速入门', link: '/courses/mybatis/index', activeMatch: '/courses/mybatis/' }
    ],
    activeMatch: '/courses/'
  },
  // {
  //   text: '我的标签',
  //   link: '/tags',
  //   activeMatch: '/tags'
  // },
  // {
  //   text: '我的归档',
  //   link: '/archives',
  //   activeMatch: '/archives'
  // },
  // {
  //   text: '关于',
  //   items: [
  //     { text: '关于知识库', link: '/about/index', activeMatch: '/about/index' },
  //     { text: '关于我', link: '/about/me', activeMatch: '/about/me' }
  //   ],
  //   activeMatch: '/about/' // // 当前页面处于匹配路径下时, 对应导航菜单将突出显示
  // },
];