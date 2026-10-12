import { useNavigation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from '../components/Layout/Layout';
import Loader from '../components/Loader/Loader';
import { useProductStore } from '../Store/useProductStore';

export default function MainLayouts() {
  const navigation = useNavigation();
  const listLoading = useProductStore((s) => s.listLoading);
  const currentLoading = useProductStore((s) => s.currentLoading);

  const isLoading = navigation.state === 'loading' || listLoading || currentLoading;

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
      {isLoading && <Loader />}
      <Layout />
    </ConfigProvider>
  );
}