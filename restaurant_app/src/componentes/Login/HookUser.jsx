export const HookUser = (u, setUser) => {
    setUser({
        id: u.id_usuario,
        nombre: u.nom_usuario,
        apellido: u.ap_paterno,
        rol: u.id_rol
    })
}