export type Topic = {
    title: string;
    content: string;
    simplified: string;
};

export const topics: Record<string, Topic> = {
    '1': {
        title: 'Renda Fixa',
        content:
            'Renda Fixa são investimentos com rentabilidade previsível, como Tesouro Direto, CDBs e LCIs/LCAs. Geralmente oferecem menor risco e são ideais para preservar seu capital com tranquilidade.',
        simplified:
            'Renda Fixa é como emprestar seu dinheiro ao governo ou ao banco e receber de volta com um pequeno lucro. É seguro e fácil de entender.',
    },
    '2': {
        title: 'Liquidez',
        content:
            'Liquidez indica a facilidade e a velocidade com que você pode resgatar seu dinheiro. Investimentos com alta liquidez permitem saque rápido, mas podem oferecer um rendimento um pouco menor.',
        simplified:
            'Liquidez é o quão rápido você consegue transformar o investimento em dinheiro na sua conta. Quanto mais rápido, maior a liquidez.',
    },
    '3': {
        title: 'Diversificação',
        content:
            'Diversificação é distribuir seu investimento em diferentes ativos para reduzir riscos. Ao não concentrar tudo em um único investimento, você protege seu patrimônio de oscilações bruscas.',
        simplified:
            'Diversificação é não colocar todos os ovos na mesma cesta: você coloca seu dinheiro em vários investimentos para ficar mais seguro.',
    },
    '4': {
        title: 'Fundos Imobiliários',
        content:
            'Fundos Imobiliários (FIIs) permitem investir em imóveis sem comprar um diretamente. Você recebe rendimentos mensais e pode negociar cotas na bolsa, aproveitando ganhos de aluguéis.',
        simplified:
            'FIIs são empresas que compram imóveis e você compra uma parte delas. Você ganha um pedacinho do aluguel sem ter de gerenciar o imóvel.',
    },
    '5': {
        title: 'Ações',
        content:
            'Ações representam frações do capital de empresas. Ao investir, você se torna sócio e pode ter ganhos maiores, mas também assume maior volatilidade e risco.',
        simplified:
            'Ações são pequenas partes de uma empresa. Se a empresa vai bem, você ganha mais, mas corre mais risco.',
    },
};

export const mainMenuText =
    'Escolha um tópico para começar:\n1. Renda Fixa\n2. Liquidez\n3. Diversificação\n4. Fundos Imobiliários\n5. Ações';
