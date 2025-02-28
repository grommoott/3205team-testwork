const Interactions = {
    Create: "create",
    GetInfo: "getInfo",
    Delete: "delete",
    Analytics: "analytics",
} as const

type Interaction = (typeof Interactions)[keyof typeof Interactions]

function translateInteraction(interaction: Interaction) {
    switch (interaction) {
        case Interactions.Create:
            return "Сократить ссылку"

        case Interactions.GetInfo:
            return "Информация о ссылке"

        case Interactions.Delete:
            return "Удалить ссылку"

        case Interactions.Analytics:
            return "Аналитика по ссылке"
    }
}

export { Interactions, translateInteraction }
export type { Interaction }
