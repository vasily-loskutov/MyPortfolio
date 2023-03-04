import { useQuery } from "react-query";
import { InfoService } from "@service/info.service";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery("get Project Full page", () =>
    InfoService.getProjectInfoById(id)
  );
  console.log(data);
  if (isLoading) return "Loading";
  return (
    <div>
      <div className="my-16 flex flex-col items-center gap-y-10">
        <h1 className="sectionTitle">{data[0].name}</h1>
        <div className="max-w-xl max-h-xl">
          <img
            src={`../upload/${data[0].path}`}
            className="max-w-full max-h-full bg-center bg-cover rounded-lg"
          />
        </div>

        <h2 className="font-DM-sans font-bold text-2xl">
          Skills: {data[0].skills}
        </h2>
        <a
          className=" border-black border rounded py-3 px-5"
          href={data[0].link}
          target="_blank">
          <div className="flex gap-x-2.5">
            <img src="/src/assets/img/gitHubBlack.svg" /> GitHub repo
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProjectPage;
