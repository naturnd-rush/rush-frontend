import toast from "react-hot-toast";
import { FaLink } from "react-icons/fa";

export default async function copyUrlToClipboard() {
  await navigator.clipboard.writeText(location.href);
  toast.success('Share link copied!', {
    icon: <FaLink />,
    style: { background: 'rgb(56, 161, 105)', color: 'white'}})
}