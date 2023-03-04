import { useQuery } from "react-query";
import { InfoService } from "@service/info.service";

const Footer = () => {
  const { data, isLoading } = useQuery(
    "get social in footer",
    InfoService.getSocial
  );
  console.log(data);
  if (isLoading) return "loading";
  return (
    <div className="bg-accentBlack flex justify-center shrink-0">
      <div className="text-white my-14">
        <ul className="flex justify-around mb-2">
          {data.map((social) => {
            return (
              <li>
                <a href={social.linkSocial} target="_blank">
                  <img
                    src={`upload/${social.filename}`}
                    alt=""
                    className="w-6 h-6"
                  />
                </a>
              </li>
            );
          })}
        </ul>
        <p>© 2022 frontend-dev.com</p>
      </div>
    </div>
  );
};

export default Footer;
