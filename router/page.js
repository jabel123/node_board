const express = require('express');
const { Post, User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  console.log('test', res.locals.user);
  next();
});

router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird'});
});

router.get('/join', (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird'});
});

router.get('/', async (req, res, next) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'nick'],
    },
    order: [['createdAt', 'DESC']],
  });
  res.render('main', {
    title: 'NodeBird',
    twits: posts,
  });
});

module.exports = router;