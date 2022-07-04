import { FC } from 'react';
import { Avatar, Card, Col, List, PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { getFirstLetter, getFormattedDateTime } from '@frontend/utils';
import { useTypedSelector } from '@frontend/hooks';

interface ListProfileData {
  title: string;
  value: string | number | undefined;
}

export const Profile: FC = () => {
  const { t } = useTranslation();
  const { user } = useTypedSelector((state) => state.app);
  const firstLetter = getFirstLetter(user?.name as string);
  const data: ListProfileData[] = [
    {
      title: t('LABELS.EMAIL'),
      value: user?.email,
    },
    {
      title: t('LABELS.NAME'),
      value: user?.name,
    },
    {
      title: t('LABELS.JOINED'),
      value: getFormattedDateTime(user?.createdAt as string),
    },
  ];

  return (
    <>
      <PageHeader title={t('HEADER.PROFILE')}></PageHeader>
      <Card style={{ flex: '1 1 auto' }}>
        <Row gutter={32}>
          <Col>
            <Avatar style={{ fontSize: '40px' }} size={128}>
              {firstLetter}
            </Avatar>
          </Col>
          <Col flex="auto">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<span>{item.title}:</span>}
                    description={item.value}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};
