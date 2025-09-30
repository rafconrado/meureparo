import React from 'react';
import { View } from 'react-native';
import { Promo } from '../../../../types';
import { PromoCard, PromoContent, PromoTitle, PromoDescription, PromoDiscount, Subtitle } from '../style';

interface PromoCardItemProps {
    item: Promo;
}

export const PromoCardItem = React.memo(({ item }: PromoCardItemProps) => {
    return (
        <PromoCard
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <PromoContent>
                <View>
                    <PromoTitle>{item.title}</PromoTitle>
                    <PromoDescription>{item.description}</PromoDescription>
                    <Subtitle style={{ fontSize: 12, marginTop: 4, color: '#E0E0E0' }}>
                        {item.providerName} • Até {item.validUntil}
                    </Subtitle>
                </View>
                <PromoDiscount>{item.discount}</PromoDiscount>
            </PromoContent>
        </PromoCard>
    );
});