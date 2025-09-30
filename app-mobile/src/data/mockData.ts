import { Provider, Category, Promo, Partner } from '../types';

export const providersData: Provider[] = [
    {
        id: "1",
        advertisementId: "ad-joao-eletricista-01", // ID do anúncio
        name: "João Silva",
        category: "Eletricista",
        rating: 4.8,
        reviews: 127,
        price: "R$ 80/hora",
        image: require("../../assets/images/utils/placeholder.png"),
        isVerified: true,
        isPromoted: true,
    },
    {
        id: "2",
        advertisementId: "ad-maria-diarista-02", // ID do anúncio
        name: "Maria Santos",
        category: "Diarista",
        rating: 4.9,
        reviews: 89,
        price: "R$ 150/dia",
        image: require("../../assets/images/utils/placeholder.png"),
        isVerified: true,
        discount: 15,
    },
    {
        id: "3",
        advertisementId: "ad-pedro-encanador-03", // ID do anúncio
        name: "Pedro Costa",
        category: "Encanador",
        rating: 4.7,
        reviews: 65,
        price: "R$ 100/hora",
        image: require("../../assets/images/utils/placeholder.png"),
        isVerified: false,
    },
    {
        id: "4",
        advertisementId: "ad-ana-pintora-04", // ID do anúncio
        name: "Ana Oliveira",
        category: "Pintura",
        rating: 5.0,
        reviews: 203,
        price: "R$ 200/dia",
        image: require("../../assets/images/utils/placeholder.png"),
        isVerified: true,
        isPromoted: true,
        discount: 20,
    },
];

export const categoriesData: Category[] = [
    { id: "1", name: "Elétrica", icon: "flash", color: "#FFB800" },
    { id: "2", name: "Hidráulica", icon: "water", color: "#4A90E2" },
    { id: "3", name: "Limpeza", icon: "sparkles", color: "#7ED321" },
    { id: "4", name: "Pintura", icon: "brush", color: "#F5A623" },
    { id: "5", name: "Reformas", icon: "hammer", color: "#BD10E0" },
    { id: "6", name: "Jardinagem", icon: "leaf", color: "#50E3C2" },
];

export const promosData: Promo[] = [
    {
        id: "1",
        title: "Primeira Contratação",
        description: "Desconto especial para novos clientes",
        discount: "30% OFF",
        validUntil: "31/10/2025",
        providerName: "João Silva",
    },
    {
        id: "2",
        title: "Combo Limpeza",
        description: "Limpeza completa com desconto",
        discount: "25% OFF",
        validUntil: "15/11/2025",
        providerName: "Maria Santos",
    },
];

export const partnersData: Partner[] = [
    {
        id: "1",
        name: "Amanco",
        logo: require("../../assets/images/logo/amanco.png"),
    },
    {
        id: "2",
        name: "Tigre",
        logo: require("../../assets/images/logo/tigre logo.png"),
    },
    {
        id: "3",
        name: "Lorenzetti",
        logo: require("../../assets/images/logo/lorenzetti.png"),
    },
    {
        id: "4",
        name: "Suvinil",
        logo: require("../../assets/images/logo/suvinil.png"),
    },
];