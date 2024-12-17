import VectorIcon from '../assets/images/Vector.svg';
import InfoIcon from '../assets/images/info.svg';
import LocationMarkerIcon from '../assets/images/locationmarker.svg';
import FacebookIcon from '../assets/images/facebookIcon.svg';
import InstagramIcon from '../assets/images/instagram.svg';
import TwitterIcon from '../assets/images/twitter.svg';
import LinkedInIcon from '../assets/images/linkedin.svg';

// Company Details Data
export const companyDetailsData = (companyDetail) => [
    { label: "Website", value: companyDetail?.webUrl, icon: VectorIcon },
    { label: "Description", value: companyDetail?.description, icon: InfoIcon },
    { label: "Email", value: companyDetail?.email, icon: LocationMarkerIcon },
    { label: "Facebook", value: companyDetail?.facebookUrl, icon: FacebookIcon, isLink: true },
    { label: "Instagram", value: companyDetail?.instagramUrl, icon: InstagramIcon, isLink: true },
    { label: "Twitter", value: companyDetail?.twitterUrl, icon: TwitterIcon, isLink: true },
    { label: "LinkedIn", value: companyDetail?.linkedinUrl, icon: LinkedInIcon, isLink: true },
    { label: "Address", value: companyDetail?.address, icon: LocationMarkerIcon }
];