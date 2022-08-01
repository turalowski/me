import {
  BsFacebook,
  BsTwitter,
  BsGithub,
  BsLinkedin,
  BsInstagram,
} from 'react-icons/bs';

const FACEBOOK = 'https://www.facebook.com/tworal.io/';
const INSTAGRAM = 'https://www.instagram.com/turalowski/';
const LINKEDIN = 'https://www.linkedin.com/in/tural-hajiyev-703a15155/';
const GITHUB = 'https://github.com/turalowski';
const TWITCH = 'https://www.twitch.tv/turalhj';
const TWITTER = 'https://twitter.com/turalowski';
const YOUTUBE = 'https://www.youtube.com/channel/UCHZjSTNSK7YVPV7BzdgDlbQ';

export const socials = [
  {
    name: 'Facebook',
    link: FACEBOOK,
    icon: props => <BsFacebook {...props} />,
  },
  {
    name: 'Instagram',
    link: INSTAGRAM,
    icon: props => <BsInstagram {...props} />,
  },
  {
    name: 'LinkedIn',
    link: LINKEDIN,
    icon: props => <BsLinkedin {...props} />,
  },
  {
    name: 'Twitter',
    link: GITHUB,
    icon: props => <BsGithub {...props} />,
  },
  {
    name: 'Twitter',
    link: TWITTER,
    icon: props => <BsTwitter {...props} />,
  },
];
