import BaseCommonPart from "./component/page-builder/base";

export const EdgeScreenComponent = ({ title, subtitle }) => {
  return (
    <BaseCommonPart>
      <div className="h-[92vh] bg-lightBgColor dark:bg-darkBgColor text-zinc-900 dark:text-white text-center">
        <div className="pt-20">
          <h1 className="text-4xl">{title}</h1>
          <p className="mt-2">{subtitle}</p>
        </div>
      </div>
    </BaseCommonPart>
  );
};
