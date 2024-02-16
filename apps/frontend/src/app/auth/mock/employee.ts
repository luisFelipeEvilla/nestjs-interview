export const mockEmployee = {
    id: 1,
    name: 'John Doe',
    email: 'jon@doe.com',
    paymentType: 'HOURLY',
    paymentRate: 12
}

export const mockEmployees = [
    mockEmployee,
    {
        ...mockEmployee,
        id: 2
    },
    {
        ...mockEmployee,
        id: 3
    }
]