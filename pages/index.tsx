import { GetStaticProps } from 'next';
import { getServices } from '../lib/contentful';

type Service = {
  title: string;
  description: string;
  urgency: string;
  image: { fields: { file: { url: string } } };
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
            <img src={`https:${service.image.fields.file.url}`} alt={service.title} />
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
      services,
    },
  };
};

export default Home;
