import PostTypes from "../posttypes";
import BaseCommonPart from "./base";
import CommonPostStyle from "./post-prototype/post-common-style";

const HomePage = () => {
  const testing = [
    {
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      <div className="h-auto bg-lightBgColor dark:bg-darkBgColor">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 2xl:px-40 py-1">
          {testing.map((item, index) => {
            return <CommonPostStyle key={index} item={item} />;
          })}
        </div>
      </div>
    </BaseCommonPart>
  );
};

export default HomePage;
