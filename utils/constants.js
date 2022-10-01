import { BsTwitter, BsGithub } from 'react-icons/bs';

const GITHUB = 'https://github.com/turalowski';
const TWITTER = 'https://twitter.com/turalowski';

export const socials = [
  {
    name: 'Github',
    link: GITHUB,
    icon: props => <BsGithub {...props} />,
  },
  {
    name: 'Twitter',
    link: TWITTER,
    icon: props => <BsTwitter {...props} />,
  },
];
