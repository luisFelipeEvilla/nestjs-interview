import { Enterprise } from '../app/enterprise/entities/enterprise.entity';

export const createEnterpriseDto = {
  name: 'mock',
}

export const updateEnpterpriseDto = {
  name: 'mock updated',
}

export const mockEnterprise: Enterprise = {
  id: 1,
  name: 'mock',
};

export const mockUpdatedEnterprise: Enterprise = {
  ...mockEnterprise,
  name: 'mock updated',
}

export const mockEnterprises: Enterprise[] = [mockEnterprise];
