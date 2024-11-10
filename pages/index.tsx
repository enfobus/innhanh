import { GetStaticProps } from 'next';
import { getServices } from '../lib/contentful';

type Service = {
  title: string;
  description: string;
  urgency: string;
  image?: { fields: { file: { url: string } } };
};

type HomeProps = {
  services: Service[];
};

const Home = ({ services }: HomeProps) => {
  return (
    <div className="container">
      <h1>Dịch vụ in ấn nhanh</h1>
      <div className="services">
        {services.map((service, index) => (
          <div key={index} className="service">
            {service.image?.fields?.file?.url ? (
              <img src={`https:${service.image.fields.file.url}`} alt={service.title} />
            ) : (
              <p>Hình ảnh không khả dụng</p>
            )}
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p><strong>Thời gian:</strong> {service.urgency}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const services = await getServices();
  return {
    props: {
      services: services.map((service: any) => ({
        title: service.fields?.title ?? "Dịch vụ không có tiêu đề",
        description: service.fields?.description ?? "Không có mô tả",
        urgency: service.fields?.urgency ?? "Không rõ",
        image: service.fields?.image || null
      }))
    },
  };
};

export default Home;
