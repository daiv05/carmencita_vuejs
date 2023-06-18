import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { basename } from 'node:path'
import vitePrerender  from 'vite-plugin-prerender';
import path from 'path'

// const path = require('path')
// const PrerendererWebpackPlugin = require('@prerenderer/webpack-plugin')

// module.exports = {
//   plugins: [
//     new PrerendererWebpackPlugin({
//       routes: ['/registrar_nueva_venta', '/empleado_modificar', '/listar_empleados', '/gestion_cargos', '/editar_producto', '/agregar_producto', '/sales_list', '/detail_sales', '/detail_cf', '/gestion_productos', '/'],
//     })
//   ]
// }


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePrerender({
      // Required - The path to the vite-outputted app to prerender.
      staticDir: path.join(__dirname, 'dist'),
      // Required - Routes to render.
      routes: ['/registrar_nueva_venta', '/empleado_agregar', '/empleado_modificar/', '/listar_empleados', '/gestion_cargos', '/editar_producto/', '/agregar_producto', '/sales_list', '/detail_sales/', '/detail_cf/', '/gestion_productos', '/about', '/'],
    }),
    // prerender({
    //   // Configura las rutas que deseas prerenderizar
    //   entries: ['/registrar_nueva_venta', '/empleado_agregar', '/empleado_modificar', '/listar_empleados', '/gestion_cargos', '/editar_producto', '/agregar_producto', '/sales_list', '/detail_sales', '/detail_cf', '/gestion_productos', '/about', '/'],
    //   //staticDir: 'public',
    //   staticDir: 'dist',
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  publicDir: 'public'
})
