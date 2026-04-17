## Código Open Source do Portfólio
> Ainda vou reformular ele para ser mais acessível para outras pessoas modificarem e tirar as minhas informações, mas por enquanto vou deixar esse README.md.

Esse projeto é como foi feito o código do meu portfólio com comentários explicativos. Ele é um projeto feito com 
Next.js e para criar toda essa estrutura eu usei o comando CLI `npx create-next-app@latest`, selecionando _"Yes"_ para *Tailwind, App Router* e _No_ para src/ directory. Com isso ele automatiza e cria as pastas organizadas, além de também já colocar o link da documentação(<https://nextjs.org/docs/app/api-reference/cli/create-next-app>) com um README.md explicativo, mas eu adaptei o README.md dele (esse aqui) para explicar como foi criado o projeto e se for criar seu próprio projeto ele coloca o README.md padrão dele.

## Como Rodar o Projeto

Digite o comando no terminal:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

## Como Organizar

Primeiro digite o comando mencionado anteriormente `npx create-next-app@latest`, após a criação da pasta app, instale as bibliotecas de animação e utilitários:

Comando para instalar as bibliotecas e as dependencias:
```bash
npm install lucide-react framer-motion class-variance-authority clsx tailwind-merge
```

## Como Adaptar 

Na pasta app, o código do portfólio com comentários está em page.tsx e mostra como foi a lógica do desenvolvimento do portfólio, foi apenas ele que eu editei e implementei toda a estrutura que eu queria do projeto, mas ainda pretendo deixar mais comentado e explicativo o arquivo.


## Explicação do Uso das Ferramentas


## Tailwind
Normalmente você dá um nome para um elemento no HTML e vai para outro arquivo (style.css) escreve todas as propriedades visuais daquele botão. O problema é que para questões de otimização de tempo eu preferi usar o Tailwind, porque ele inverte essa lógica. Ele é um framework de classes utilitárias e que, ao invés de eu ter o trabalho de ficar indo para o CSS colocar todos os estilos, criando classe .btn-primario por ex, eu crio o visual diretamente no HTML, juntando pequenas peças, sem nunca precisar sair do arquivo JavaScript/HTML.

## TypeScript
É uma ferramenta que age como "segurança" do JavaScript, na qual adiciona uma camada de "tipagem estática" por cima. Ele verifica os erros de lógica enquanto o código é digitado, antes dele ir para o navegador. Como o navegador só entende JavaScript, o TypeScript faz o trabalho do segurança e, depois que garante que está tudo perfeito, ele "traduz" o código para JavaScript puro e manda para o navegador, isso é chamado de Transpilação (processo de converter código-fonte de uma linguagem de programação para outra).

> No comando CLI ele já instalou o TypeScript.

## Next.js
Escolhi Next.js por ser um framework React focado em produção, que traz vantagens como performance e constrói páginas pré-renderizadas, o que melhora muito o carregamento. Sobre as rotas, o Next gerencia com base na estrutura de pastas do projeto. Se eu criar uma pasta "sobre'", ele cria a rota 'rotadosite.com/sobre' automaticamente. É simples e eficiente.


## Design / UX Design
Escolhi um design inspirado no "Brutalismo" que tem como características autocontraste, formas geómetricas e é bem chamativo e justamente por chamar atenção que eu o escolhi, porque por mais que tenha visto que isso pode ser contra intuitivo na perspectiva do Design, achei que para o meu currículo em específico faria mais sentido para chamar atenção  para o meu trabalho. Usei sombras pretas sólidas, linhas grossas e tipografia marcante para atingir esse objetivo.

## Vercel
Ele é um host de sites, focado principalmente para front-end e faz com que a aplicação fique em deploy contínuo na Vercel conectado no GitHub. Se eu altero o código, automaticamente sobe para a plataforma também. O Vercel é basicamente uma plataforma de nuvem otimizada, funcionando especialmente para projetos que utilizam a sua _framework in-house_, o Next.js. Funciona num conceito chamado _Edge Network_, ou seja, o site é distribuído por servidores no mundo todo para carregar instantaneamente.

