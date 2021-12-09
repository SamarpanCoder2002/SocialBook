import { PostTypes } from "../types/posttypes";
import BaseCommonPart from "./base";
import CommonPostStyle from "./post-prototype/post-common-style";

const HomePage = () => {
  const testing = [
    {
      id: 1,
      type: PostTypes.Poll,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. My Website: https://samarpandasgupta.com It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        pollItems: {
          question: "Do you like this?",
          prevResults: [
            { text: "Yes", votes: 2 },
            { text: "No", votes: 0 },
            { text: "Fucking You", votes: 1 },
          ],
        },
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 2,
      type: PostTypes.Pdf,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        pdfSrc:
          "https://drive.google.com/file/d/1wgfgmiY1e1bXNb1IwOtvf__T2bFym3Dr/view?usp=sharing",
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 3,
      type: PostTypes.Slide,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        sliderContent: [
          {
            type: "image",
            data: "https://images.pexels.com/photos/9469740/pexels-photo-9469740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            alt: "type1",
          },
          {
            type: "text",
            data: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
          },
          {
            type: "text",
            data: ` 
            
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            
            `,
          },
          {
            type: "image",
            data: "https://images.pexels.com/photos/239332/pexels-photo-239332.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            alt: "type2",
          },
          {
            type: "image",
            data: "https://images.pexels.com/photos/326869/pexels-photo-326869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            alt: "type3",
          },
        ],
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 4,
      type: PostTypes.Image,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        image: [
          "https://images.pexels.com/photos/10334730/pexels-photo-10334730.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          "https://media-exp1.licdn.com/dms/image/C4D22AQEQR3bplOU6fQ/feedshare-shrink_800/0/1638455528983?e=1641427200&v=beta&t=c0Gi_SfKPk1HeElJdGuuIijA1twgv78GnfSZz3LNbMo",
          "https://images.pexels.com/photos/9469740/pexels-photo-9469740.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          "https://images.pexels.com/photos/9990682/pexels-photo-9990682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/9811066/pexels-photo-9811066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/9902092/pexels-photo-9902092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/9697495/pexels-photo-9697495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/8654494/pexels-photo-8654494.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        ],
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 5,
      type: PostTypes.Image,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        image: [
          "https://media-exp1.licdn.com/dms/image/sync/C4D22AQEF9kFztmZ8dQ/feedshare-shrink_800/0/1613556518572?e=1641427200&v=beta&t=z7LtBhcY0UmyHEWXL__3ps7x9DadyAb_JllcQJqLcp0",
        ],
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 6,
      type: PostTypes.Video,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        video: "https://www.youtube.com/embed/ZO6RGhYAhuc",
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 7,
      type: PostTypes.Text,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 8,
      type: PostTypes.Text,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 9,
      type: PostTypes.Text,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
  ];

  return (
    <BaseCommonPart>
      <div className="h-auto bg-lightBgColor dark:bg-darkBgColor pt-3">
        <div className="container mx-auto px-4 sm:px-6 md:px-24 lg:px-52 2xl:px-96 py-1">
          {testing.map((item, index) => {
            console.log("item", item);
            return <CommonPostStyle key={index} item={item} fromHomePage={true} />;
          })}
        </div>
      </div>
    </BaseCommonPart>
  );
};

export default HomePage;
